from pydantic import BaseModel, EmailStr


# Used when a user signs up
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


# Used when returning user data
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        from_attributes = True