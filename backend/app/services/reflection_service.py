from sqlalchemy.orm import Session
from uuid import UUID
from app.models.reflection import Reflection
from app.integrations.gemini_client import gemini_client

class ReflectionService:
    async def save_reflection(self, db: Session, user_id: UUID, request):
        ai_analysis = await gemini_client.generate_text(
            f"Analyze this reflection: {request.reflection_text}. Identify main obstacle and emotional tone."
        )
        
        reflection = Reflection(
            user_id=user_id,
            reflection_text=request.reflection_text,
            reflection_date=request.date,
            ai_summary=ai_analysis
        )
        db.add(reflection)
        db.commit()
        db.refresh(reflection)
        return {"reflection_id": reflection.id}

    async def get_latest(self, db: Session, user_id: UUID):
        reflection = db.query(Reflection).filter(Reflection.user_id == user_id).order_by(Reflection.created_at.desc()).first()
        if not reflection: return None
        return {
            "reflection_id": reflection.id,
            "date": reflection.reflection_date,
            "reflection_text": reflection.reflection_text,
            "ai_summary": reflection.ai_summary
        }

reflection_service = ReflectionService()
