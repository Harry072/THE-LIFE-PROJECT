from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db, get_current_user
from app.schemas.user import UserBase
from app.schemas.auth import BaseResponse
from app.services import user_service

router = APIRouter()

@router.get("/me", response_model=BaseResponse[UserBase])
async def get_me(current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await user_service.get_user_by_id(db, current_user_id)
    return {"success": True, "data": data, "message": "User profile fetched"}
