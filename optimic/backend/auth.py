import json
import os
import uuid
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from jose import JWTError, jwt

load_dotenv(".env")

SECRET_KEY = os.getenv("SECRET_KEY", "your-super-secret-key-12345")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
TOKEN_EXPIRE_DAYS = int(os.getenv("TOKEN_EXPIRE_DAYS", 7))

AUTH_FILE = "auth.json"


def load_auth() -> dict:
    if not os.path.exists(AUTH_FILE):
        with open(AUTH_FILE, "w") as f:
            json.dump({"users": []}, f, indent=2)
    with open(AUTH_FILE, "r") as f:
        return json.load(f)


def save_auth(data: dict):
    with open(AUTH_FILE, "w") as f:
        json.dump(data, f, indent=2)


def find_user_by_email(email: str):
    auth = load_auth()
    return next((u for u in auth["users"] if u["email"] == email), None)


def create_user(email: str, name: str) -> dict:
    auth = load_auth()
    user = {
        "uid": str(uuid.uuid4()),
        "email": email,
        "name": name,
    }
    auth["users"].append(user)
    save_auth(auth)
    return user


def get_or_create_user(email: str, name: str) -> dict:
    user = find_user_by_email(email)
    if user is None:
        user = create_user(email, name)
    return user


def create_token(user: dict) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=TOKEN_EXPIRE_DAYS)
    payload = {
        "uid": user["uid"],
        "email": user["email"],
        "name": user["name"],
        "exp": expire,
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> dict:
    """Decodes JWT and verifies user against auth.json."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise ValueError("Invalid or expired token")

    uid = payload.get("uid")
    email = payload.get("email")
    name = payload.get("name")

    if not uid or not email or not name:
        raise ValueError("Invalid token payload")

    auth = load_auth()
    user = next((u for u in auth["users"] if u["uid"] == uid), None)

    if not user:
        raise ValueError("User not found in system")

    if user["email"] != email or user["name"] != name:
        raise ValueError("Authentication data mismatch")

    return user



def delete_user(uid: str):
    auth = load_auth()
    auth["users"] = [u for u in auth["users"] if u["uid"] != uid]
    save_auth(auth)



