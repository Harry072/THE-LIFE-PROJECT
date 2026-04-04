from google.oauth2 import id_token
from google.auth.transport import requests
from app.core.config import settings
from fastapi import HTTPException, status

class GoogleAuthClient:
    @staticmethod
    def verify_token(token: str):
        """
        Verifies the Google ID token and returns user information.
        """
        try:
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request(), 
                settings.GOOGLE_CLIENT_ID
            )
            return {
                "sub": idinfo['sub'],
                "email": idinfo['email'],
                "name": idinfo.get('name'),
                "picture": idinfo.get('picture')
            }
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Google authentication token"
            )

google_auth_client = GoogleAuthClient()
