# Import packages
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import state
from state import MarketingState

# Import graph and agents
from agents import compile_state_graph


# Define Data Models
class Data(BaseModel):
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

# define origins
origins = [
    "http://127.0.0.1:5173",
    "https://internship-sat.vercel.app",
]

# Start Point
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Graph
graph = compile_state_graph()

@app.get("/")
def hello_world():
    return {"message": "Hello, World!"}


# # Middlware check for user authentication
# @app.middleware("http")
# async def check_auth(request, call_next):
#     # Implement the logic to check if the user is authenticated
#     # For example, you can check for a valid session or token in the request
#     # If the user is not authenticated, return an error response
#     # If the user is authenticated, proceed with the request
#     pass


# Authenticate User
@app.post("/authenticate")
def authenticate_user(user_data: UserData):
    # Implement the logic to authenticate the user
    print(f"Authenticating user: {user_data.email}, {user_data.name}")
    # generate a token or session for the user (this is just a placeholder)
    # store session in cookie for future requests (this is just a placeholder)
    return {"message": "User authenticated successfully."}



# DATA = Offre + Policies
@app.post("/generate")
async def generate_offre(data: Data):
    inputs = {
        "offre_rules": data.policies,
        "customer_data": data.customer_data,
        "next": "SCORING",
    }

    # Thread 1: User Alice
    config1 = {"configurable": {"thread_id": data.thread_id}}

    final_state = await graph.ainvoke(inputs, config1)
    return {
        "offre_rules": final_state.get("offre_rules"),
        "customer_data": final_state.get("customer_data"),
        "score": final_state.get("score"),
        "offre": final_state.get("offre"),
        "validation_feedback": final_state.get("validation_feedback"),
        "optimized_offre": final_state.get("optimized_offre")
    }

# DATA = Offre + Feedback
@app.post("/analyse")
async def analyse():
    print("Analysing ...")
    return {"message": "Analyse endpoint not implemented yet."}


# Upload Dataset
@app.post("/upload-dataset")
async def upload_dataset(dataUploaded: UploadData):
    print(dataUploaded.rows)
    print(dataUploaded.id)
    print(dataUploaded.thread_id)
    # Rag Model to start chat with the dataset
    # We Process data
    # Store Data Into Vector Database With Specific User ID
    pass



# start ask next question to the dataset
@app.post("/ask-question")
async def ask_question():
    # Rag Model to ask question about the dataset
    pass




# Email + Offre
@app.post("/send-offre")
def send_offre():
    # Implement the logic to send the offer to the selected customers
    pass