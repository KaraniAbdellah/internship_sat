# Import packages
from fastapi import FastAPI
from pydantic import BaseModel

# Import state
from state import MarketingState

# Import graph and agents
from agents import compile_state_graph


# Define Data Models
class Data(BaseModel):
    customer_data: str = "no customer data"
    policies: str = "no offre polices"

# Start Point
app = FastAPI()


# Define Graph
graph = compile_state_graph()

@app.get("/")
def hello_world():
    return {"message": "Hello, World!"}

# DATA = Offre + Policies
@app.post("/generate")
def generate_offre(data: Data):
    customer_data = data.customer_data 
    policies = data.policies
    
    # Build State
    state: MarketingState = {
        "offre_rules": policies,
        "customer_data": customer_data,
        "score": "",
        "offre": "",
        "validation_feedback": "",
        "optimized_offre": "",
        "next": "SCORING"
    }
    final_state = graph.invoke(state)
    return {"message": "Offre generation completed.", "final_state": final_state}
        

# DATA = Offre + Feedback
@app.post("/analyse")
def analyse():
    return {"message": "Analyse endpoint not implemented yet."}


