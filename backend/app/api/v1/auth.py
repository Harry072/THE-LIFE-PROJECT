from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.schemas.auth import GoogleAuthRequest, AuthResponse
from app.services import auth_service

router = APIRouter()

@router.post("/google", response_model=AuthResponse)
async def auth_google(request: GoogleAuthRequest, db: Session = Depends(get_db)):
    """Authenticate user via Google and issue JWT."""
    result = await auth_service.authenticate_google_user(db, request.google_id_token)
    if not result:
        raise HTTPException(status_code=401, detail="Authentication failed")
    return {
        "success": True,
        "data": result,
        "message": "Authenticated successfully"
    }
