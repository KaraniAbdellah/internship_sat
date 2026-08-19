# Import packages
from fastapi import FastAPI
import os
from dotenv import load_dotenv
from typing_extensions import TypedDict, Literal
from langchain_groq import ChatGroq
from pydantic import BaseModel

# Import graph and agents
from agents import compile_state_graph


# Load Env Vars
load_dotenv(".env")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")


# Define LLM
basic_llm = ChatGroq(model="llama-3.1-8b-instant", api_key = GROQ_API_KEY, temperature=0)


# Import Prompts
f = open("./prompts/generations.md")
GENERATION_PROMPT = f.read()
f = open("./prompts/optimisation.md")
OPTIMISATION_PROMPT = f.read()
f = open("./prompts/scoring.md")
SCORING_PROMPT = f.read()
f = open("./prompts/validation.md")
VALIDATION_PROMPT = f.read()



# Define Data Models
class GenerateData(BaseModel):
    customer_data: str
    policies: str

# State Definition
class MarketingState(TypedDict):
    offre_rules: str
    customer_data: str
    score: str
    offre: str
    validation_feedback: str
    optimized_offre: str
    next: Literal["SCORING", "GENERATION", "VALIDATION", "OPTIMISATION", "END"]

# Start Point
app = FastAPI()


# Define Graph
app = compile_state_graph()

@app.get("/")
def hello_world():
    return {"message": "Hello, World!"}

# DATA = Offre + Policies
@app.post("/generate")
def generate_offre(data: GenerateData):
    customer_data = data["customer_data"] 
    policies = data["policies"]
    
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
    final_state = app.invoke(state)
    print(f"Final State: {final_state}")
    return final_state
        

# DATA = Offre + Feedback
@app.post("/analyse")
def analyse():
    return {"message": "Analyse endpoint not implemented yet."}
    pass


