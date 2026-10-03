from pydantic import BaseModel


# -------------------------
# Signup
# -------------------------

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True


# -------------------------
# Login
# -------------------------

class LoginRequest(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# -------------------------
# Job Description
# -------------------------

class JobDescriptionRequest(BaseModel):
    job_description: str


# -------------------------
# Dashboard
# -------------------------

class DashboardResponse(BaseModel):
    resume_score: float | None = None
    latest_job_match: float | None = None
    detected_skills: int = 0
    has_resume: bool = False
    has_job_match: bool = False