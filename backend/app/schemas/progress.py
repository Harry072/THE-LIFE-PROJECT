from typing import Optional
from pydantic import BaseModel
from datetime import date, datetime
from .auth import BaseResponse

class ProgressData(BaseModel):
    xp: int
    streak: int
    completed_task_count: int
    skipped_task_count: int
    reflection_count: int
    last_active_date: Optional[date] = None
    current_focus_area: Optional[str] = None

class ProgressResponse(BaseResponse[ProgressData]):
    pass

class TreeData(BaseModel):
    tree_score: float
    tree_stage: str
    growth_percentage: float
    last_growth_at: Optional[datetime] = None

class TreeResponse(BaseResponse[TreeData]):
    pass
