from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Text
from datetime import datetime

from database import Base


# -------------------------
# User
# -------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


# -------------------------
# Resume
# -------------------------

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    filepath = Column(String, nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))


# -------------------------
# Job Match
# -------------------------

class JobMatch(Base):
    __tablename__ = "job_matches"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=False)

    job_description = Column(Text, nullable=False)

    match_percentage = Column(Float, nullable=False)

    resume_score = Column(Float, nullable=False)

    matched_skills = Column(Text, nullable=True)

    missing_skills = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)