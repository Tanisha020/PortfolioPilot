import os
import ssl
import asyncio
import httpx
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
NEON_API_KEY = os.getenv("NEON_API_KEY")
NEON_PROJECT_ID = os.getenv("NEON_PROJECT_ID")

# ✅ Check if database URL is set
if not DATABASE_URL:
    raise ValueError("❌ DATABASE_URL is not set. Check your .env file.")

# ✅ Configure SSL for database connection
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_OPTIONAL

# ✅ Create async engine
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
    __tablename__ = "login_credentials"  # Ensure this matches your DB table name

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)  # Ensure password is hashed in auth.py

# ✅ Wake Up Neon Database
async def activate_neon():
    if not NEON_API_KEY:
        print("❌ NEON_API_KEY is missing. Skipping auto-activation.")
        return
    if not NEON_PROJECT_ID:
        print("❌ NEON_PROJECT_ID is missing. Check your .env file.")
        return

    url = f"https://console.neon.tech/api/v2/projects/{NEON_PROJECT_ID}/endpoints"
    headers = {
        "Authorization": f"Bearer {NEON_API_KEY}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
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

# ✅ Dependency to get a database session
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()  # Ensure session closes properly
