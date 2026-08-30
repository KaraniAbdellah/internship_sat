from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from auth import create_token, get_or_create_user, verify_token, delete_user
from models.models import MarketingData, UploadData, ChatData, UserData
from auth import TOKEN_EXPIRE_DAYS 
from agents import compile_state_graph
from chatbot import check_dataset_exists, get_user_dataset_record, initialize_chatbot, process_data_into_qdrant, add_user_dataset_record

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
    user_uid = request.state.user.get("uid") or request.state.user.get("sub")
    dataset_id = dataUploaded.dataset_id
    dataset_name = dataUploaded.dataset_name
    is_active = dataUploaded.is_active
    rows = dataUploaded.rows

    # 0.0: Check if dataset is already registered for this user
    user_exit = get_user_dataset_record(user_uid, dataset_id)
    print("Already exists:", user_exit)
    
    # 0.1: if Dataset Already Exists for the User, Return a Message
    if user_exit:
        dataset_exit = check_dataset_exists(user_uid, dataset_id)
        print("Dataset Already Exists for the User:", dataset_exit)
        if dataset_exit:
            return {
                "status": "Dataset already exists for this user",
            }
    
    # 1. Add User In the Registry File
    add_user_dataset_record(user_uid, dataset_name, dataset_id)
    
    # 2: Initialize Qdrant Collection for the User
    initialize_chatbot(user_uid)
    
    # 3: Process Data into Qdrant
    process_data_into_qdrant(rows, dataset_id, user_uid)

    return {
        "status": "Dataset saved in vector database",
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

    

# Add the /logout endpoint
@app.post("/logout")
def logout_user(response: Response):
    # Delete the auth_token cookie to log the user out
    print(type(response))
    print(response.headers)
    response.set_cookie("auth_token", "", max_age=0, httponly=True, secure=False, samesite="lax")
    
    # delete_cookie matches the parameters used in set_cookie
    response.delete_cookie(
        key="auth_token",
        httponly=True,
        secure=False,   # Set to True on production HTTPS
        samesite="lax", # Set to "none" if cross-domain in production
    )
    return {"message": "Logged out successfully"}


