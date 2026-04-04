from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db, get_current_user
from app.schemas.reflection import ReflectionCreate, ReflectionCreateResponse, ReflectionLatestResponse
from app.services import reflection_service

router = APIRouter()

@router.post("", response_model=ReflectionCreateResponse)
async def create_reflection(request: ReflectionCreate, current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await reflection_service.save_reflection(db, current_user_id, request)
    return {"success": True, "data": data, "message": "Reflection saved"}

@router.get("/latest", response_model=ReflectionLatestResponse)
async def get_latest_reflection(current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await reflection_service.get_latest(db, current_user_id)
    return {"success": True, "data": data, "message": "Latest reflection"}
