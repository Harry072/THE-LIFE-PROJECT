from sqlalchemy.orm import Session
from uuid import UUID
from app.models.user import User

class UserService:
    async def get_user_by_id(self, db: Session, user_id: UUID):
        return db.query(User).filter(User.id == user_id).first()

user_service = UserService()
