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
import traceback
from fastapi.responses import JSONResponse

# Load .env variables
load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET", "your_secret_key")
ALGORITHM = "HS256"

auth_router = APIRouter()

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@auth_router.post("/register")
async def register(user: UserRegister, db: AsyncSession = Depends(get_db)):
    try:
        print(f"Registering user: {user.name}, {user.email}")

        # 🔹 Check if user already exists
        result = await db.execute(select(User).filter(User.email == user.email))
        existing_user = result.scalars().first()

        if existing_user:
            print("❌ User already exists!")
            raise HTTPException(status_code=400, detail="User already exists")

        # 🔹 Hash password securely
        hashed_pw = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()

        # 🔹 Create new user instance
        new_user = User(name=user.name, email=user.email, password=hashed_pw)
        db.add(new_user)

        await db.commit()  # 🔹 Commit the transaction
        await db.refresh(new_user)  # 🔹 Refresh to get latest DB state

        print("✅ User registered successfully")
        return {"message": "User registered successfully"}

    except Exception as e:
        print("🔥 ERROR DURING REGISTRATION 🔥")
        traceback.print_exc()  # Print full error traceback

        return JSONResponse(
            status_code=500,
            content={"error": "An error occurred while registering the user."}
        )

@auth_router.post("/login")
async def login(user: UserLogin, db: AsyncSession = Depends(get_db)):
    try:
        # 🔹 Fetch user without opening a transaction (read-only)
        result = await db.execute(select(User).where(User.email == user.email))
        db_user = result.scalars().first()
    # except Exception as e:
    # print(f"🔥 Database Error: {e}")
    # raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

        if not db_user or not bcrypt.checkpw(user.password.encode(), db_user.password.encode()):
            raise HTTPException(status_code=400, detail="Invalid email or password")

        # 🔹 Generate JWT token
        token = jwt.encode({"sub": db_user.email, "exp": datetime.utcnow() + timedelta(hours=1)}, SECRET_KEY, algorithm=ALGORITHM)

        return {"token": token, "name": db_user.name, "message": "Login successful"}

    except Exception as e:
        print("🔥 ERROR DURING LOGIN 🔥")
        traceback.print_exc()

        return JSONResponse(
            status_code=500,
            content={"error": "An error occurred while logging in."}
        )

@auth_router.get("/protected")
async def protected_route():
    return {"message": "You have access to this protected route!"}
