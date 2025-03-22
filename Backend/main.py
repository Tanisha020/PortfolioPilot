from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
from auth import auth_router
from routes.simulate import router as simulate_router
from routes.suggestions import router as suggestions_router  # ✅ Import suggestions router

app = FastAPI()

# ✅ Run Database Activation on Startup
# @app.on_event("startup")
# async def on_startup():
#     print("🔄 Running Startup Tasks...")
#     await startup()
#     print("✅ Startup Completed!")

# Include authentication routes
app.include_router(auth_router, prefix="/auth")

# Include simulation routes
print("✅ Simulate Router Loaded Successfully!")
app.include_router(simulate_router, prefix="/simulate")

# ✅ Include suggestions routes
print("✅ Suggestions Router Loaded Successfully!")
app.include_router(suggestions_router, prefix="/suggestions")  # ✅ Add this line

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
