from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db

app = FastAPI()

# Test route to check database connection
@app.get("/")
async def test_db(db: AsyncSession = Depends(get_db)):
    return {"message": "Database connected successfully!"}

# Add other API routes here (e.g., user authentication, portfolio management)


