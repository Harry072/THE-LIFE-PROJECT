from typing import Optional
from pydantic import BaseModel
from uuid import UUID
from datetime import date
from .auth import BaseResponse

class ReflectionCreate(BaseModel):
    date: date
    task_id: Optional[UUID] = None
    mood_label: Optional[str] = None
    reflection_text: str

class ReflectionCreateData(BaseModel):
    reflection_id: UUID

class ReflectionCreateResponse(BaseResponse[ReflectionCreateData]):
    pass

class ReflectionLatestData(BaseModel):
    reflection_id: UUID
    date: date
    mood_label: Optional[str] = None
    reflection_text: str
    main_obstacle: Optional[str] = None
    emotional_tone: Optional[str] = None
    ai_summary: Optional[str] = None
    next_step_suggestion: Optional[str] = None

class ReflectionLatestResponse(BaseResponse[ReflectionLatestData]):
    pass
