# Import packages
import json
import os
import os
from qdrant_client import QdrantClient, models
from qdrant_client.http.models import PointStruct, Document
from qdrant_client.http.exceptions import UnexpectedResponse
from dotenv import dotenv_values


# Load environment variables
config = dotenv_values(".env")
QDRANT_CLOUD_API_KEY = config.get("QDRANT_CLOUD_API_KEY")
QDRANT_CLOUD_ENDPOINT = config.get("QDRANT_CLOUD_ENDPOINT")
REGISTRY_PATH = "chats.json"

# Connection With QDrant Cloud
client_qdrant = QdrantClient(
    url=QDRANT_CLOUD_ENDPOINT,
    api_key=QDRANT_CLOUD_API_KEY,
    cloud_inference=True,
    timeout=60
)


# Collection Creation - Collection That Support Hybrid Search
COLLECTION_NAME = "optimic_collection"

    
def get_user_dataset_record(user_uid: str, dataset_id: str) -> bool:
    """Check if the user and dataset already exist in the file."""
    if not os.path.exists(REGISTRY_PATH):
        return False

    with open(REGISTRY_PATH, "r") as file:
        try:
            records = json.load(file)
            return any(
                item.get("user_uid") == user_uid and 
                item.get("datasets", {}).get("dataset_id") == dataset_id
                for item in records
            )
        except json.JSONDecodeError:
            return False


def check_dataset_exists(user_uid: str, dataset_id: str) -> bool:
    """Check if the dataset exists for the given user."""
    if not os.path.exists(REGISTRY_PATH):
        return False

    with open(REGISTRY_PATH, "r") as file:
        try:
            records = json.load(file)
            for record in records:
                if record.get("user_uid") == user_uid:
                    datasets = record.get("datasets", [])
                    for dataset in datasets:
                        if dataset.get("dataset_id") == dataset_id:
                            return True
            return False
        except json.JSONDecodeError:
            return False

def add_user_dataset_record(user_uid: str, dataset_name: str, dataset_id: str):
    """Add a new user and dataset record to the file."""
    record = {
        "user_uid": user_uid,
        "datasets": {
            "dataset_name": dataset_name,
            "dataset_id": dataset_id
        }
    }

    if os.path.exists(REGISTRY_PATH):
        with open(REGISTRY_PATH, "r") as file:
            try:
                records = json.load(file)
            except json.JSONDecodeError:
                records = []
    else:
        records = []

    records.append(record)

    with open(REGISTRY_PATH, "w") as file:
        json.dump(records, file, indent=2)

def ensure_user_shard_exists(user_uid: str):
    """Creates a shard for the user if it doesn't already exist."""
    try:
        client_qdrant.create_shard_key(
            collection_name=COLLECTION_NAME,
            shard_key=user_uid
        )
    except UnexpectedResponse:
        # Shard key already exists; safe to proceed
        pass

# Create Shared Collection in Qdrant Cloud (If Not Exists)
def initialize_chatbot(user_uid: str):
    ensure_user_shard_exists(user_uid)



# Preprocessing
def process_data_into_qdrant(rows: list, dataset_uid: str, user_uid: str):
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
