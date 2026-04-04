from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db, get_current_user
from app.schemas.meditation import MeditationCategoriesResponse, MeditationRecommendationResponse
from app.services import meditation_service

router = APIRouter()

@router.get("/categories", response_model=MeditationCategoriesResponse)
async def get_categories(current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await meditation_service.get_all_categories(db)
    return {"success": True, "data": data, "message": "Meditation categories"}

@router.get("/recommendation", response_model=MeditationRecommendationResponse)
async def get_recommendation(current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await meditation_service.get_personalized_recommendation(db, current_user_id)
    return {"success": True, "data": data, "message": "Meditation recommendation"}
