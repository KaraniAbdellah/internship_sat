# this file for prevent "Resolving Circular Imports in Python"
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from typing_extensions import TypedDict, Literal, List
import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langgraph.graph.message import add_messages
from typing import Annotated




# # Prompt Caching
from langchain_core.globals import set_llm_cache
from langchain_community.cache import InMemoryCache
from pydantic import BaseModel


set_llm_cache(InMemoryCache())

# Load Env Vars
load_dotenv(".env")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Define LLM
fast_llm = ChatGroq(model="openai/gpt-oss-20b", api_key = GROQ_API_KEY, temperature=0.3)
# fast_llm = ChatGoogleGenerativeAI(
#     model="gemini-3.5-flash",
#     temperature=0.5,
#     api_key=GOOGLE_API_KEY
# )
"""
    - Supported Modal:
        groq/compound-mini
        qwen/qwen3.6-27b
        openai/gpt-oss-safeguard-20b
        openai/gpt-oss-20b
        allam-2-7b
        whisper-large-v3
        whisper-large-v3-turbo
        openai/gpt-oss-120b
        canopylabs/orpheus-arabic-saudi
        groq/compound
        meta-llama/llama-prompt-guard-2-86m
        meta-llama/llama-prompt-guard-2-22m
        canopylabs/orpheus-v1-english
"""

# State Definition 
class ValidationResult(BaseModel):
    validation: bool
    description: str

class MarketingState(TypedDict):
    offre_rules: str
    customer_data: str
    score: str
    offre: str
    validation_feedback: ValidationResult
    optimized_offre: str
    next: Literal["SCORING", "GENERATION", "VALIDATION", "OPTIMISATION", "END"]
    messages: Annotated[list, add_messages]

class DeleteDatasetData(BaseModel):
    dataset_id: str
    user_uid: str


# Import Prompts
f = open("./prompts/generations.md")
GENERATION_PROMPT = f.read()
f = open("./prompts/optimisation.md")
OPTIMISATION_PROMPT = f.read()
f = open("./prompts/scoring.md")
SCORING_PROMPT = f.read()
f = open("./prompts/validation.md")
VALIDATION_PROMPT = f.read()

