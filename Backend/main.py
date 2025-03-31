
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
from auth import auth_router
from routes.simulate import router as simulate_router
from routes.suggestions import router as suggestions_router  
from routes.risk_assessment import router as risk_router  

app = FastAPI()




app.include_router(auth_router, prefix="/auth")


print("✅ Simulate Router Loaded Successfully!")
app.include_router(simulate_router, prefix="/simulate")


print("✅ Suggestions Router Loaded Successfully!")
app.include_router(suggestions_router, prefix="/suggestions")  


print("✅ Risk Assessment Router Loaded Successfully!")
app.include_router(risk_router, prefix="/risk-assessment")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def test_db(db: AsyncSession = Depends(get_db)):
    return {"message": "Database connected successfully!"}
