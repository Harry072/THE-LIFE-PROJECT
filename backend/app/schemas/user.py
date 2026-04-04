from typing import Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID

class UserBase(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str
    profile_image_url: Optional[str] = None
