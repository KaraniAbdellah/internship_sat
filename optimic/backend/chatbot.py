# Import packages
import json
import os
import os
import uuid
from qdrant_client import QdrantClient, models
from qdrant_client.http.models import PointStruct, Document, FusionQuery
from qdrant_client.http.exceptions import UnexpectedResponse
from dotenv import dotenv_values
from state import fast_llm
from groq import Groq
from langchain_core.messages import SystemMessage, HumanMessage



# Load environment variables
config = dotenv_values(".env")
QDRANT_CLOUD_API_KEY = config.get("QDRANT_CLOUD_API_KEY")
QDRANT_CLOUD_ENDPOINT = config.get("QDRANT_CLOUD_ENDPOINT")
GROQ_API_KEY  = config["GROQ_API_KEY"]
REGISTRY_PATH = "chats.json"

# Connection With QDrant Cloud
client_qdrant = QdrantClient(
    url=QDRANT_CLOUD_ENDPOINT,
    api_key=QDRANT_CLOUD_API_KEY,
    cloud_inference=True,
    timeout=60
)

# Get Groq Model
client_groq = Groq(api_key=GROQ_API_KEY)



# Collection Creation - Collection That Support Hybrid Search
COLLECTION_NAME = "optimic_collection"


def get_user_dataset_record(user_uid: str, dataset_id: str) -> bool:
    """Check if the user and dataset already exist in the file."""
    if not os.path.exists(REGISTRY_PATH):
        return False

    try:
        with open(REGISTRY_PATH, "r") as file:
            records = json.load(file)
            if not isinstance(records, list):
                return False

            return any(
                record.get("user_uid") == user_uid and
                any(d.get("dataset_id") == dataset_id for d in record.get("datasets", []))
                for record in records
            )
    except (json.JSONDecodeError, OSError):
        return False


def check_dataset_exists(user_uid: str, dataset_id: str) -> bool:
    """Check if the dataset exists for the given user."""
    if not os.path.exists(REGISTRY_PATH):
        return False

    try:
        with open(REGISTRY_PATH, "r") as file:
            records = json.load(file)
            if not isinstance(records, list):
                return False

            for record in records:
                if record.get("user_uid") == user_uid:
                    datasets = record.get("datasets", [])
                    return any(d.get("dataset_id") == dataset_id for d in datasets)
            return False
    except (json.JSONDecodeError, OSError):
        return False


def add_user_dataset_record(user_uid: str, dataset_name: str, dataset_id: str):
    """Add a new dataset to an existing user or create a new user record."""
    records = []
    if os.path.exists(REGISTRY_PATH):
        try:
            with open(REGISTRY_PATH, "r") as file:
                loaded = json.load(file)
                if isinstance(loaded, list):
                    records = loaded
        except (json.JSONDecodeError, OSError):
            records = []

    new_dataset = {
        "dataset_name": dataset_name,
        "dataset_id": dataset_id
    }

    user_found = False
    for record in records:
        if record.get("user_uid") == user_uid:
            user_found = True
            if "datasets" not in record or not isinstance(record["datasets"], list):
                record["datasets"] = []

            # Avoid adding duplicate dataset_id entries under the user
            if not any(d.get("dataset_id") == dataset_id for d in record["datasets"]):
                record["datasets"].append(new_dataset)
            break

    if not user_found:
        records.append({
            "user_uid": user_uid,
            "datasets": [new_dataset]
        })

    with open(REGISTRY_PATH, "w") as file:
        json.dump(records, file, indent=2)



# Create Shared Collection in Qdrant Cloud (If Not Exists)
def initialize_chatbot(user_uid: str):
    client_qdrant.create_collection(
        collection_name="optimic_collection",
        # 1. Dense vector configuration (named "dense")
        vectors_config={
            "dense": models.VectorParams(
                size=384,  # all-MiniLM-L6-v2 output dimension
                distance=models.Distance.COSINE,
            )
        },
        # 2. Sparse vector configuration (named "sparse")
        sparse_vectors_config={
            "sparse": models.SparseVectorParams(
                modifier=models.Modifier.IDF  # Recommended for BM25 scoring
            )
        },
        # 3. Custom sharding for per-user shard keys
        sharding_method=models.ShardingMethod.CUSTOM,
    )

    cluster_info = client_qdrant.get_collection(collection_name=COLLECTION_NAME)
    print("Cluster Info:", cluster_info)
    print("Initializing Qdrant Collection for user By Creating Shard:", user_uid)
    try:
        client_qdrant.create_shard_key(
            collection_name=COLLECTION_NAME,
            shard_key=user_uid
        )
    except UnexpectedResponse:
        # Shard key already exists; safe to proceed
        pass



# Preprocessing
def add_doc_qdrant_cloud(rows: str, payload: dict, user_uid: str):
    for row in rows:
        print("Adding row to Qdrant Cloud: ", row)
        points = [
                models.PointStruct(
                    id=uuid.uuid4().hex,
                    vector={
                        "dense": Document(
                            text=str(row),
                            model="sentence-transformers/all-MiniLM-L6-v2",
                        ),
                        "sparse": Document(
                            text=str(row),
                            model="Qdrant/bm25",
                        ),
                    },
                    payload=payload,
                )
        ]
        client_qdrant.upsert(
            collection_name=COLLECTION_NAME,
            points=points,
            shard_key_selector=user_uid
        )


def process_data_into_qdrant(rows: list[list[str]], dataset_id: str, user_uid: str):
    print("Processing data into Qdrant...")
    payload = {
        "dataset_id": dataset_id,
        "user_uid": user_uid
    }
    add_doc_qdrant_cloud(rows, payload, user_uid)




# 1. Retrieve relevant chunks using shard_key routing and dataset_id filtering
def get_relevant_chunks_from_qdrant(question: str, dataset_uid: str, user_uid: str, limit: int = 5) -> str:
    try:
        results = client_qdrant.query_points(
            collection_name=COLLECTION_NAME,
            # Multi-tenant isolation: routes strictly to the user's logical shard
            shard_key_selector=user_uid,
            
            # Metadata filter: targets only the selected dataset inside the user's shard
            query_filter=models.Filter(
                must=[
                    models.FieldCondition(
                        key="dataset_id",
                        match=models.MatchValue(value=dataset_uid),
                    )
                ]
            ),
            
            # Hybrid search (Dense + Sparse BM25) merged via Reciprocal Rank Fusion (RRF)
            prefetch=[
                models.Prefetch(
                    query=Document(
                        text=question,
                        model="sentence-transformers/all-MiniLM-L6-v2",
                    ),
                    using="dense",
                    limit=limit * 2,
                ),
                models.Prefetch(
                    query=Document(
                        text=question,
                        model="Qdrant/bm25",
                    ),
                    using="sparse",
                    limit=limit * 2,
                ),
            ],
            query=FusionQuery(fusion=models.Fusion.RRF),
            limit=limit,
        )

        # Extract text representations from matched point payloads
        chunks = []
        for point in results.points:
            content = (
                point.payload.get("text") 
                or point.payload.get("text_representation") 
                or str(point.payload.get("raw_data", ""))
            )
            if content:
                chunks.append(content)

        if not chunks:
            return "لا توجد سجلات مطابقة في هذا الجدول."

        return "\n".join(f"- {chunk}" for chunk in chunks)

    except Exception as e:
        print(f"Error querying Qdrant: {e}")
        return ""


# 2. Generate Answer based on Context and Prompt
def generate_response(question: str, context: str) -> str:
    sys_prompt = f"""
       Give Response Based on the following context and question.
       Context: {context}
       Question: {question}
    """

    messages = [
        SystemMessage(content=sys_prompt),
        HumanMessage(content=question),
    ]

    # Stream chunks from LangChain LLM and aggregate
    res = []
    for chunk in fast_llm.stream(messages):
        if chunk.content:
            res.append(chunk.content)

    return "".join(res)

# 3. Orchestration Entry Point
def get_response_from_qdrant(user_uid: str, dataset_id: str, question: str) -> str:
    # Retrieve relevant rows directly from the user's shard
    relevant_chunks = get_relevant_chunks_from_qdrant(question, dataset_id, user_uid)
    print("Relevant Chunks Retrieved:", relevant_chunks)
    print("Question:", question)
    # Generate LLM response
    answer = generate_response(question, relevant_chunks)
    
    return answer

