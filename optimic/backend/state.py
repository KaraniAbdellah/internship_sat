# this file for prevent "Resolving Circular Imports in Python"

from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from typing_extensions import TypedDict, Literal
import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq



# Load Env Vars
load_dotenv(".env")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Define LLM
# basic_llm = ChatGroq(model="llama-3.1-8b-instant", api_key = GROQ_API_KEY, temperature=0)
basic_llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0, max_tokens=4696, api_key=GOOGLE_API_KEY)


# State Definition    
class MarketingState(TypedDict):
    offre_rules: str
    customer_data: str
    score: str
    offre: str
    validation_feedback: str
    optimized_offre: str
    next: Literal["SCORING", "GENERATION", "VALIDATION", "OPTIMISATION", "END"]


# Import Prompts
f = open("./prompts/generations.md")
GENERATION_PROMPT = f.read()
f = open("./prompts/optimisation.md")
OPTIMISATION_PROMPT = f.read()
f = open("./prompts/scoring.md")
SCORING_PROMPT = f.read()
f = open("./prompts/validation.md")
VALIDATION_PROMPT = f.read()


