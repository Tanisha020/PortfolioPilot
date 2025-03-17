# from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
# from sqlalchemy.orm import sessionmaker, declarative_base
# import os
# from dotenv import load_dotenv
# from sqlalchemy import Column, Integer, String

# # Load environment variables from .env file (Recommended for security)
# load_dotenv()

# # Neon PostgreSQL Connection URL (Replace with your actual Neon database URL)
# DATABASE_URL = os.getenv("DATABASE_URL")

# # Ensure the DATABASE_URL is set
# if not DATABASE_URL:
#     raise ValueError("DATABASE_URL is not set. Please check your .env file.")


# # Create async engine
# engine = create_async_engine(DATABASE_URL, echo=True)

# # Create async session
# AsyncSessionLocal = sessionmaker(
#     bind=engine,
#     class_=AsyncSession,
#     expire_on_commit=False
# )

# # Base model for SQLAlchemy
# Base = declarative_base()

# ####usertable####
# class User(Base):
#     __tablename__ = "login_credentials"  # This must match the table name in Neon

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, nullable=False)
#     email = Column(String, unique=True, nullable=False)
#     password = Column(String, nullable=False)

# # Dependency to get database session in routes
# async def get_db():
#     async with AsyncSessionLocal() as session:
#         yield session


import os
import ssl
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve the database URL from the .env file (Ensure `sslmode=require` is included)
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Please check your .env file.")

# ✅ Create an SSL context for asyncpg
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = True  # Enforce proper hostname verification
ssl_context.verify_mode = ssl.CERT_REQUIRED  # Ensure SSL certificates are verified

# ✅ Create async engine with SSL support
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    connect_args={"ssl": ssl_context}  # Use SSL for secure connections
)

# ✅ Create async session
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# ✅ Base model for SQLAlchemy
Base = declarative_base()

# ✅ Define User Model to match your `login_credentials` table
class User(Base):
    __tablename__ = "login_credentials"  # Ensure table name matches DB

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(100), unique=True, nullable=False)
    name = Column(String(50), nullable=False)
    password = Column(String(255), nullable=False)  # Matches your VARCHAR(255)

# ✅ Dependency to get database session in routes
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()  # Ensure session closes properly
