from pydantic import BaseModel

# Define Data Models
class MarketingData(BaseModel):
    customer_data: str = "no customer data"
    policies: str = "no offre polices"
    user_uid: str = "thread-1"

# Define Data Chat Model
class UploadData(BaseModel):
    rows: list = []
    dataset_name: str = "no name"
    dataset_id: str = "no id"
    user_uid: str = "thread-1"
    is_active: bool = False

# Define Data Chat Model
class ChatData(BaseModel):
    question: str = "no question"
    user_uid: str = "thread-1"
    dataset_id: str = "no dataset id"

# User Model
class UserData(BaseModel):
    email: str = "no email"
    name: str = "no full name"
    user_uid: str = "no uid"
