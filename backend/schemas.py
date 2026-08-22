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