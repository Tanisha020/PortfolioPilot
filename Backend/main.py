from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
from auth import auth_router 


app = FastAPI()
app.include_router(auth_router, prefix="/auth")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Test route to check database connection
@app.get("/")
async def test_db(db: AsyncSession = Depends(get_db)):
    return {"message": "Database connected successfully!"}

# Add other API routes here (e.g., user authentication, portfolio management)


