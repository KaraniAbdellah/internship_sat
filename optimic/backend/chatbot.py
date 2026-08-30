# Import packages
from qdrant_client import QdrantClient, models
from qdrant_client.http.models import PointStruct, Document
from dotenv import dotenv_values


# Load environment variables
config = dotenv_values(".env")
QDRANT_CLOUD_API_KEY = config.get("QDRANT_CLOUD_API_KEY")
QDRANT_CLOUD_ENDPOINT = config.get("QDRANT_CLOUD_ENDPOINT")


# Connection With QDrant Cloud
client_qdrant = QdrantClient(
    url=QDRANT_CLOUD_ENDPOINT,
    api_key=QDRANT_CLOUD_API_KEY,
    cloud_inference=True,
    timeout=60
)


# Collection Creation - Collection That Support Hybrid Search
collection_name = "optimic_collection"


# Create Shared Collection in Qdrant Cloud (If Not Exists)
def create_shared_collection(user_uid: str):
    client_qdrant.get_collection(collection_name)
    print(f"Collection '{collection_name}' already exists.")


# Preprocessing
def preprocess_text(rows: list, dataset_uid: str, user_uid: str):
    pass


# Store Chunks Into Qdrant Cloud with MetaData (Dataset_uid and User_uid)
def store_chunks_in_qdrant(chunks: list, dataset_uid: str, user_uid: str):
    pass

# Get Relevent Chunks From Qdrant Cloud Based on User Question and Dataset_uid
def get_relevant_chunks_from_qdrant(question: str, dataset_uid: str, user_uid: str):
    pass


# Generate Answer Based on Relevent Chunks and User Question
def generate_answer(question: str, relevant_chunks: list):
    pass
