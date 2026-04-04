from typing import List, Optional
from pydantic import BaseModel
from uuid import UUID
from datetime import date
from .auth import BaseResponse

class TaskItem(BaseModel):
    id: UUID
    title: str
    description: Optional[str] = None
    category: str
    duration_minutes: int
    status: str
    optional: bool

class TaskTodayData(BaseModel):
    date: date
    tasks: List[TaskItem]

class TaskTodayResponse(BaseResponse[TaskTodayData]):
    pass

class TaskCompleteRequest(BaseModel):
    reflection_text: Optional[str] = None

class TaskSkipRequest(BaseModel):
    reason: Optional[str] = None

class TaskActionData(BaseModel):
    task_id: UUID
    status: str

class TaskActionResponse(BaseResponse[TaskActionData]):
    pass
