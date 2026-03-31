import uuid
from datetime import datetime, date, timezone
from typing import TYPE_CHECKING, Optional

from sqlalchemy import String, DateTime, Integer, ForeignKey, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from .user import User


class Progress(Base):
    __tablename__ = "progress"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    
    xp: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    streak: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    completed_task_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    skipped_task_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    reflection_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    
    last_active_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    current_focus_area: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="progress")
