import uuid
from datetime import datetime, date, timezone
from typing import TYPE_CHECKING, Optional, List

from sqlalchemy import String, Boolean, DateTime, Integer, ForeignKey, Text, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from .user import User


class MeditationCategory(Base):
    __tablename__ = "meditation_categories"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    default_duration_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    recommendations: Mapped[List["MeditationRecommendation"]] = relationship(back_populates="category")
    sessions: Mapped[List["MeditationSession"]] = relationship(back_populates="category")


class MeditationRecommendation(Base):
    __tablename__ = "meditation_recommendations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    meditation_category_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("meditation_categories.id", ondelete="RESTRICT"), nullable=False)
    
    source_context: Mapped[str] = mapped_column(String(100), nullable=False)
    reason: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    recommended_duration_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    recommended_for_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="meditation_recommendations")
    category: Mapped["MeditationCategory"] = relationship(back_populates="recommendations")
    sessions: Mapped[List["MeditationSession"]] = relationship(back_populates="recommendation")


class MeditationSession(Base):
    __tablename__ = "meditation_sessions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    meditation_category_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("meditation_categories.id", ondelete="RESTRICT"), nullable=False)
    meditation_recommendation_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("meditation_recommendations.id", ondelete="SET NULL"), nullable=True)
    
    duration_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="started", nullable=False)
    
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="meditation_sessions")
    category: Mapped["MeditationCategory"] = relationship(back_populates="sessions")
    recommendation: Mapped[Optional["MeditationRecommendation"]] = relationship(back_populates="sessions")
