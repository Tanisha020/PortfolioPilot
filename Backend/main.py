# from fastapi import FastAPI, Depends
# from sqlalchemy.ext.asyncio import AsyncSession
# from database import get_db
# from fastapi.middleware.cors import CORSMiddleware
# from auth import auth_router 


# app = FastAPI()
# app.include_router(auth_router, prefix="/auth")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allow all origins (for testing)
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# # Test route to check database connection
# @app.get("/")
# async def test_db(db: AsyncSession = Depends(get_db)):
#     return {"message": "Database connected successfully!"}

# # Add other API routes here (e.g., user authentication, portfolio management)


from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
from auth import auth_router  
from routes.simulate import router as simulate_router  # Import the simulate router

app = FastAPI()

# Include authentication routes
app.include_router(auth_router, prefix="/auth")

# Include simulation routes
print("✅ Simulate Router Loaded Successfully!")
app.include_router(simulate_router, prefix="/simulate")

app.include_router(simulate_router, prefix="/simulate")  # Include simulate routes

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
