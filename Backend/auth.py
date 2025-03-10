from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import get_db, User
from pydantic import BaseModel
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load .env variables
load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET", "your_secret_key")
ALGORITHM = "HS256"

# ✅ Use APIRouter instead of creating a new FastAPI app
auth_router = APIRouter()

# ✅ Pydantic Models for Request Validation
class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# ✅ Register Endpoint (Saves to Neon DB)
@auth_router.post("/register")
async def register(user: UserRegister, db: AsyncSession = Depends(get_db)):
    try:
        async with db.begin():
            # Debugging: Print input values
            print(f"Registering user: {user.name}, {user.email}")

            result = await db.execute(select(User).filter(User.email == user.email))
            existing_user = result.scalars().first()

            if existing_user:
                print("User already exists!")
                raise HTTPException(status_code=400, detail="User already exists")

            hashed_pw = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()
            new_user = User(name=user.name, email=user.email, password=hashed_pw)

            db.add(new_user)
            await db.commit()
        
        return {"message": "User registered successfully"}

    except Exception as e:
        print(f"Error during registration: {e}")  # Debugging
        raise HTTPException(status_code=500, detail="Internal Server Error")


# ✅ Login Endpoint
@auth_router.post("/login")
async def login(user: UserLogin, db: AsyncSession = Depends(get_db)):
    async with db.begin():
        result = await db.execute(select(User).where(User.email == user.email))
        db_user = result.scalars().first()

        if not db_user or not bcrypt.checkpw(user.password.encode(), db_user.password.encode()):
            raise HTTPException(status_code=400, detail="Invalid email or password")

    token = jwt.encode({"sub": db_user.email, "exp": datetime.utcnow() + timedelta(hours=1)}, SECRET_KEY, algorithm=ALGORITHM)
    return {"token": token, "name": db_user.name, "message": "Login successful"}

# ✅ Protected Route
@auth_router.get("/protected")
async def protected_route():
    return {"message": "You have access to this protected route!"}
