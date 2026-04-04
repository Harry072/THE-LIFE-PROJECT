from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, onboarding, tasks, reflection, progress, meditation, users

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok", "message": "The Life Project API is running"}

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(onboarding.router, prefix=f"{settings.API_V1_STR}/onboarding", tags=["onboarding"])
app.include_router(tasks.router, prefix=f"{settings.API_V1_STR}/tasks", tags=["tasks"])
app.include_router(reflection.router, prefix=f"{settings.API_V1_STR}/reflection", tags=["reflection"])
app.include_router(progress.router, prefix=f"{settings.API_V1_STR}/progress", tags=["progress"])
app.include_router(meditation.router, prefix=f"{settings.API_V1_STR}/meditation", tags=["meditation"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])
