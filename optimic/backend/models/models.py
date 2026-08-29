from pydantic import BaseModel

# Define Data Models
class MarketingData(BaseModel):
    customer_data: str = "no customer data"
    policies: str = "no offre polices"
    thread_id: str = "thread-1"

# Define Data Chat Model
class UploadData(BaseModel):
    rows: list = []
    id: str = "no id"
    thread_id: str = "thread-1"

# Define Data Chat Model
class ChatData(BaseModel):
    question: str = "no question"
    thread_id: str = "thread-1"
    dataset_id: str = "no dataset id"

# User Model
class UserData(BaseModel):
    email: str = "no email"
    name: str = "no full name"
