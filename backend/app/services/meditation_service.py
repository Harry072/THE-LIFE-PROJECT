from sqlalchemy.orm import Session
from uuid import UUID
from app.models.meditation import MeditationCategory
from app.engines.meditation_recommendation_engine import meditation_engine

class MeditationService:
    async def get_all_categories(self, db: Session):
        categories = db.query(MeditationCategory).all()
        return {"categories": categories}

    async def get_personalized_recommendation(self, db: Session, user_id: UUID):
        rec_text = await meditation_engine.get_recommendation("stressed")
        return {
            "category_slug": "calm_reset",
            "title": "Calm Reset",
            "duration_minutes": 5,
            "context": rec_text
        }

meditation_service = MeditationService()
