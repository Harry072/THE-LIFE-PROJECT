from sqlalchemy.orm import Session
from app.core import security
from app.models.user import User
from app.models.user_profile import UserProfile

class AuthService:
    async def authenticate_google_user(self, db: Session, id_token: str):
        user_info = security.verify_google_token(id_token)
        if not user_info: return None
        
        user = db.query(User).filter(User.email == user_info['email']).first()
        if not user:
            user = User(
                email=user_info['email'],
                full_name=user_info['name'],
                google_sub=user_info['sub'],
                profile_image_url=user_info.get('picture')
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            
            profile = UserProfile(user_id=user.id)
            db.add(profile)
            db.commit()

        token = security.create_access_token(subject=user.id)
        return {
            "token": token,
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "profile_image_url": user.profile_image_url
            }
        }

auth_service = AuthService()
