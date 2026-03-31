import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional, List

from sqlalchemy import String, DateTime, ForeignKey, Text, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from .user import User
    from .onboarding import OnboardingSession
    from .task import Task


class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    onboarding_session_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("onboarding_sessions.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    user_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    dominant_problem: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    secondary_problem: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Scores
    distraction_score: Mapped[float] = mapped_column(Numeric(5, 2), default=0, nullable=False)
    discipline_score: Mapped[float] = mapped_column(Numeric(5, 2), default=0, nullable=False)
    sleep_score: Mapped[float] = mapped_column(Numeric(5, 2), default=0, nullable=False)
    emotional_balance_score: Mapped[float] = mapped_column(Numeric(5, 2), default=0, nullable=False)
    meaning_score: Mapped[float] = mapped_column(Numeric(5, 2), default=0, nullable=False)
    peace_score: Mapped[float] = mapped_column(Numeric(5, 2), default=0, nullable=False)
    connection_score: Mapped[float] = mapped_column(Numeric(5, 2), default=0, nullable=False)
    digital_habits_score: Mapped[float] = mapped_column(Numeric(5, 2), default=0, nullable=False)
    
    ai_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    recommended_focus: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="analysis_results")
    session: Mapped["OnboardingSession"] = relationship(back_populates="analysis_result")
    tasks: Mapped[List["Task"]] = relationship(back_populates="analysis_result")
