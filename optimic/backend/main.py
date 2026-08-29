from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from auth import create_token, get_or_create_user, verify_token
from models.models import MarketingData, UploadData, ChatData, UserData
from auth import TOKEN_EXPIRE_DAYS 
from agents import compile_state_graph


app = FastAPI()

# Allow credentials for cookie transmission
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://internship-sat.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Graph
graph = compile_state_graph()


# Global Auth Middleware
@app.middleware("http")
async def authentication_middleware(request: Request, call_next):
    # Endpoints that bypass authentication
    public_paths = {"/", "/authenticate", "/logout", "/docs", "/openapi.json"}

    if request.url.path in public_paths or request.method == "OPTIONS":
        return await call_next(request)

    token = request.cookies.get("auth_token")

    if not token:
        return Response(
            content='{"detail":"Authentication required"}',
            status_code=401,
            media_type="application/json",
        )

    try:
        user = verify_token(token)
    except Exception as e:
        return Response(
            content=f'{{"detail":"{str(e)}"}}',
            status_code=401,
            media_type="application/json",
        )

    # Attach user to request state
    request.state.user = user
    return await call_next(request)


# Public Routes
@app.get("/")
def hello_world():
    return {"message": "Server is running"}



@app.post("/authenticate")
def authenticate_user(user_data: UserData, response: Response):
    user = get_or_create_user(user_data.email, user_data.name)
    token = create_token(user)

    # Set cookie (use samesite="none" & secure=True for HTTPS / Cross-domain production)
    response.set_cookie(
        key="auth_token",
        value=token,
        httponly=True,
        secure=False,      # Set to True on production HTTPS
        samesite="lax",    # Set to "none" if frontend & backend are on different domains in production
        max_age=TOKEN_EXPIRE_DAYS,  # 7 days
    )

    return {"message": "Authentication successful", "user": user}


# Protected Routes
@app.get("/me")
def get_me(request: Request):
    return {"user": request.state.user}


@app.post("/generate")
async def generate_offre(data: MarketingData, request: Request):
    user = request.state.user
    user_uid = user["uid"]
    print(f"Generating offer for user {user_uid} with data: {data.dict()}")

    # Scoped execution per user
    thread_id = f"{user_uid}"
    inputs = {
        "offre_rules": data.policies,
        "customer_data": data.customer_data,
        "next": "SCORING",
    }

    # Thread 1: User Alice
    config1 = {"configurable": {"thread_id": thread_id}}

    final_state = await graph.ainvoke(inputs, config1)
    print("Final State:", final_state.get("offre"))
    return {
        "offre_rules": final_state.get("offre_rules"),
        "customer_data": final_state.get("customer_data"),
        "score": final_state.get("score"),
        "offre": final_state.get("offre"),
        "validation_feedback": final_state.get("validation_feedback"),
        "optimized_offre": final_state.get("optimized_offre")
    }



@app.post("/upload-dataset")
async def upload_dataset(dataUploaded: UploadData, request: Request):
    user = request.state.user
    user_uid = user["uid"]
    print("dataUploaded:", dataUploaded)
    # Check User UID
    
    # Store Datasets Information for the user in a JSON file
    
    # Start Processing The Data Into Qdrant Cloud

    return {
        "status": "Dataset saved in vector database",
        "user_uid": user_uid,
        "rows_count": len(dataUploaded.rows),
    }


@app.post("/ask-question")
async def ask_question(data: ChatData, request: Request):
    user = request.state.user
    user_uid = user["uid"]
    
    # I need Two Information Dataset and User UID to Scope the RAG Response to the User Datasets
    
    return {
        "user_uid": user_uid,
        "question": data.question,
        "response": "RAG response scoped to user datasets",
    }

    
    
    
# 2. Add the /logout endpoint
@app.post("/logout")
def logout_user(response: Response):
    # delete_cookie matches the parameters used in set_cookie
    response.delete_cookie(
        key="auth_token",
        httponly=True,
        secure=False,   # Set to True on production HTTPS
        samesite="lax", # Set to "none" if cross-domain in production
    )
    return {"message": "Logged out successfully"}
