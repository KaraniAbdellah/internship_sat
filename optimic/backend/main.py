# Import packages
from urllib import response

from fastapi import FastAPI
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


# define origins
origins = [
    "http://localhost:5173",
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

# DATA = Offre + Policies
@app.post("/generate")
async def generate_offre(data: Data):
    initial_state: MarketingState = {
        "offre_rules": data.policies,
        "customer_data": data.customer_data,
        "score": "",
        "offre": "",
        "validation_feedback": "",
        "optimized_offre": "",
        "is_valid": False,
    }

    final_state = await graph.ainvoke(initial_state)

    return {
        "offre_rules": final_state.get("offre_rules"),
        "customer_data": final_state.get("customer_data"),
        "score": final_state.get("score"),
        "offre": final_state.get("offre"),
        "validation_feedback": final_state.get("validation_feedback"),
        "optimized_offre": final_state.get("optimized_offre") or final_state.get("offre"),
    }

# DATA = Offre + Feedback
@app.post("/analyse")
def analyse():
    return {"message": "Analyse endpoint not implemented yet."}


