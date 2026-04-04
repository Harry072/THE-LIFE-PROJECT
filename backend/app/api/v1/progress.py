from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db, get_current_user
from app.schemas.progress import ProgressResponse, TreeResponse
from app.services import progress_service

router = APIRouter()

@router.get("/progress", response_model=ProgressResponse)
async def get_progress(current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await progress_service.get_user_progress(db, current_user_id)
    return {"success": True, "data": data, "message": "Progress fetched"}

@router.get("/tree", response_model=TreeResponse)
async def get_tree(current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await progress_service.get_user_tree(db, current_user_id)
    return {"success": True, "data": data, "message": "Tree state fetched"}
