from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET", "your_secret_key")
ALGORITHM = "HS256"

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fake_users = {}


class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_jwt_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    
    token = authorization.split("Bearer ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


@app.get("/")
def home():
    return {"message": "Welcome to the Authentication API"}


@app.post("/register")
def register(user: UserRegister):
    if user.email in fake_users:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_pw = hash_password(user.password)
    fake_users[user.email] = {"name": user.name, "password": hashed_pw}
    
    return {"message": "User registered successfully", "email": user.email}


@app.post("/login")
def login(user: UserLogin):
    if user.email not in fake_users:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    stored_user = fake_users[user.email]
    stored_password = stored_user["password"]

  
    if not verify_password(user.password, stored_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_jwt_token({"sub": user.email})
    return {"token": token, "name": stored_user["name"], "message": "Login successful"}


@app.get("/protected")
def protected_route(user: str = Depends(get_current_user)):
    return {"message": f"Hello, {user}! You have access to this protected route."}

