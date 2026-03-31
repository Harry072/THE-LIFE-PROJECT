import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional, List

from sqlalchemy import String, DateTime, Integer, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from .user import User
    from .analysis import AnalysisResult


class OnboardingSession(Base):
    __tablename__ = "onboarding_sessions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    session_status: Mapped[str] = mapped_column(String(50), default="completed", nullable=False)
    version: Mapped[str] = mapped_column(String(20), default="v1", nullable=False)
    
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="onboarding_sessions")
    answers: Mapped[List["OnboardingAnswer"]] = relationship(back_populates="session", cascade="all, delete-orphan")
    analysis_result: Mapped[Optional["AnalysisResult"]] = relationship(back_populates="session", cascade="all, delete-orphan")


class OnboardingAnswer(Base):
    __tablename__ = "onboarding_answers"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    onboarding_session_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("onboarding_sessions.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    question_key: Mapped[str] = mapped_column(String(100), nullable=False)
    question_text: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    answer_label: Mapped[str] = mapped_column(String(50), nullable=False)
    answer_score: Mapped[int] = mapped_column(Integer, nullable=False)
    question_order: Mapped[int] = mapped_column(Integer, nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    session: Mapped["OnboardingSession"] = relationship(back_populates="answers")
    user: Mapped["User"] = relationship(back_populates="onboarding_answers")
