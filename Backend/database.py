from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
from sqlalchemy import Column, Integer, String

# Load environment variables from .env file (Recommended for security)
load_dotenv()

# Neon PostgreSQL Connection URL (Replace with your actual Neon database URL)
DATABASE_URL = os.getenv("DATABASE_URL")

# Ensure the DATABASE_URL is set
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Please check your .env file.")


# Create async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create async session
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base model for SQLAlchemy
Base = declarative_base()

####usertable####
class User(Base):
    __tablename__ = "users"  # This must match the table name in Neon

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

# Dependency to get database session in routes
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

