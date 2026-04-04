from sqlalchemy.orm import Session
from uuid import UUID
from app.models.onboarding import OnboardingSession
from app.models.analysis import AnalysisResult
from app.engines.scoring_engine import scoring_engine
from app.engines.analysis_engine import analysis_engine

class OnboardingService:
    async def get_onboarding_questions(self, db: Session, user_id: UUID):
        return {
            "session_id": UUID("00000000-0000-0000-0000-000000000000"), # Mock
            "version": "v1",
            "questions": [
                {"question_key": "dist_1", "question_text": "Do you often feel distracted?", "category": "distraction", "order": 1}
            ]
        }

    async def submit_onboarding_answers(self, db: Session, user_id: UUID, request):
        scores = scoring_engine.calculate_scores(request.answers)
        user_type = analysis_engine.classify_user(scores)
        summary = await analysis_engine.generate_summary(user_type, scores)
        
        result = AnalysisResult(
            user_id=user_id,
            onboarding_session_id=request.session_id,
            user_type=user_type,
            dominant_problem="distraction",
            ai_summary=summary,
            distraction_score=scores.get("distraction", 0)
        )
        db.add(result)
        db.commit()
        db.refresh(result)
        return {"analysis_result_id": result.id}

    async def get_analysis_result(self, db: Session, user_id: UUID, session_id: UUID):
        result = db.query(AnalysisResult).filter(AnalysisResult.onboarding_session_id == session_id).first()
        if not result: return None
        
        return {
            "analysis_result_id": result.id,
            "user_type": result.user_type,
            "dominant_problem": result.dominant_problem,
            "category_scores": {"distraction": float(result.distraction_score)},
            "summary": result.ai_summary,
            "first_tasks": [],
            "recommended_meditation": {"category_slug": "calm_reset", "title": "Calm Reset", "duration_minutes": 5},
            "reflection_prompt": "How did today feel?"
        }

onboarding_service = OnboardingService()
