import os
import ssl
import httpx  # ✅ For API request to wake up the database
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
NEON_API_KEY = os.getenv("NEON_API_KEY")  # ✅ Store the API key in .env

if not DATABASE_URL:
    raise ValueError("❌ DATABASE_URL is not set. Check your .env file.")

# ✅ Append connect timeout for slow connections
DATABASE_URL += "?connect_timeout=30"

# ✅ Create an SSL context for asyncpg
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_OPTIONAL  # Change to `ssl.CERT_NONE` if SSL issues persist

# ✅ Create async engine with optimized pooling
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    connect_args={"ssl": ssl_context},
    pool_size=10,
    max_overflow=5,
    pool_timeout=60,
    pool_recycle=1800
)

# ✅ Create async session
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# ✅ Base model for SQLAlchemy
Base = declarative_base()

# ✅ Define User Model
class User(Base):
    __tablename__ = "login_credentials"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(100), unique=True, nullable=False)
    name = Column(String(50), nullable=False)
    password = Column(String(255), nullable=False)

# ✅ Dependency to get a database session
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()  # Ensure session closes properly

# ✅ Wake Up Neon Database
# async def activate_neon():
#     if not NEON_API_KEY:
#         print("❌ NEON_API_KEY is missing. Skipping auto-activation.")
#         return

#     neon_project_id = os.getenv("NEON_PROJECT_ID")  # Store Neon project ID in .env
#     url = f"https://console.neon.tech/api/v2/projects/{neon_project_id}/endpoints"
    
#     headers = {
#         "Authorization": f"Bearer {NEON_API_KEY}",
#         "Content-Type": "application/json"
#     }

#     async with httpx.AsyncClient() as client:
#         response = await client.get(url, headers=headers)
        
#         if response.status_code == 200:
#             print("✅ Neon Database Activated Successfully!")
#         else:
#             print(f"❌ Failed to activate Neon DB: {response.json()}")
# ✅ Wake Up Neon Database
async def activate_neon():
    if not NEON_API_KEY:
        print("❌ NEON_API_KEY is missing. Skipping auto-activation.")
        return

    neon_project_id = os.getenv("NEON_PROJECT_ID")  # ✅ Get project ID from .env
    if not neon_project_id:
        print("❌ NEON_PROJECT_ID is missing. Check your .env file.")
        return

    url = f"https://console.neon.tech/api/v2/projects/{neon_project_id}/endpoints"

    headers = {
        "Authorization": f"Bearer {NEON_API_KEY}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)  # ✅ Use GET request

        if response.status_code == 200:
            print("✅ Neon Database Activated Successfully!")
        else:
            print(f"❌ Failed to activate Neon DB: {response.json()}")

# ✅ Initialize Database
async def init_db():
    await activate_neon()  # 🔥 Wake up database before connecting
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database Initialized Successfully!")

# ✅ FastAPI Startup Event
async def startup():
    print("🔄 Initializing Database...")
    try:
        await init_db()
        print("✅ Database Initialization Complete!")
    except Exception as e:
        print(f"❌ Database Initialization Failed: {e}")
