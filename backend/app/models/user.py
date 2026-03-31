import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional, List

from sqlalchemy import String, Boolean, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from .user_profile import UserProfile
    from .onboarding import OnboardingSession, OnboardingAnswer
    from .analysis import AnalysisResult
    from .task import Task, TaskLog
    from .reflection import Reflection
    from .progress import Progress
    from .tree import TreeState
    from .meditation import MeditationRecommendation, MeditationSession


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    google_sub: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    profile_image_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    auth_provider: Mapped[str] = mapped_column(String(50), default="google", nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    last_login_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    profile: Mapped["UserProfile"] = relationship(back_populates="user", cascade="all, delete-orphan")
    onboarding_sessions: Mapped[List["OnboardingSession"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    onboarding_answers: Mapped[List["OnboardingAnswer"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    analysis_results: Mapped[List["AnalysisResult"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    tasks: Mapped[List["Task"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    task_logs: Mapped[List["TaskLog"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    reflections: Mapped[List["Reflection"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    progress: Mapped["Progress"] = relationship(back_populates="user", cascade="all, delete-orphan")
    tree_state: Mapped["TreeState"] = relationship(back_populates="user", cascade="all, delete-orphan")
    meditation_recommendations: Mapped[List["MeditationRecommendation"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    meditation_sessions: Mapped[List["MeditationSession"]] = relationship(back_populates="user", cascade="all, delete-orphan")
