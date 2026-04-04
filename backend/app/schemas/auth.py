from typing import Optional, Generic, TypeVar
from pydantic import BaseModel, EmailStr
from uuid import UUID

T = TypeVar("T")

class BaseResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    message: str

class GoogleAuthRequest(BaseModel):
    google_id_token: str

class UserAuthSchema(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str
    profile_image_url: Optional[str] = None

class AuthData(BaseModel):
    token: str
    user: UserAuthSchema

class AuthResponse(BaseResponse[AuthData]):
    pass
