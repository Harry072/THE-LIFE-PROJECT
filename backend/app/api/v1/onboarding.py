from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db, get_current_user
from app.schemas.onboarding import OnboardingQuestionsResponse, OnboardingSubmitRequest, OnboardingSubmitResponse
from app.schemas.analysis import AnalysisResultResponse
from app.services import onboarding_service

router = APIRouter()

@router.get("/questions", response_model=OnboardingQuestionsResponse)
async def get_questions(current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await onboarding_service.get_onboarding_questions(db, current_user_id)
    return {"success": True, "data": data, "message": "Onboarding questions fetched"}

@router.post("/submit", response_model=OnboardingSubmitResponse)
async def submit_answers(request: OnboardingSubmitRequest, current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await onboarding_service.submit_onboarding_answers(db, current_user_id, request)
    return {"success": True, "data": data, "message": "Onboarding answers submitted"}

@router.get("/result/{session_id}", response_model=AnalysisResultResponse)
async def get_result(session_id: UUID, current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await onboarding_service.get_analysis_result(db, current_user_id, session_id)
    return {"success": True, "data": data, "message": "Analysis result fetched"}
