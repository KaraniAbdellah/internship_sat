# Import package
from fastapi import FastAPI
import os
from langgraph.graph import StateGraph, END, MessagesState
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from typing_extensions import TypedDict, Literal, Annotated
from langchain.messages import HumanMessage, SystemMessage, AnyMessage
from langgraph.graph.message import add_messages
from langchain.tools import tool
from tavily import TavilyClient
from pydantic import BaseModel, Field
from pprint import pprint
from IPython.display import Markdown, display, Image
from langgraph.prebuilt import ToolNode


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



@app.get("/")
def hello_world():
    return {"message": "Hello, World!"}

# DATA = Offre + Policies
@app.post("/generate")
def generate():
    customer_data = ""
    offre_rules = ""
    pass


# DATA = Offre + Feedback
@app.post("/feedback")
def feedback():
    pass

