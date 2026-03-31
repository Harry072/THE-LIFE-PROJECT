from datetime import datetime, timedelta, timezone
from typing import Any, Union, Optional
from jose import jwt
from google.oauth2 import id_token
from google.auth.transport import requests
from app.core.config import settings

def create_access_token(
    subject: Union[str, Any], expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt

def verify_google_token(token: str) -> Optional[dict]:
    """
    Verifies a Google ID token and returns the user info if valid.
    """
    try:
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), settings.GOOGLE_CLIENT_ID
        )
        return idinfo
    except Exception:
        return None
