from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db, get_current_user
from app.schemas.task import TaskTodayResponse, TaskCompleteRequest, TaskSkipRequest, TaskActionResponse
from app.services import task_service

router = APIRouter()

@router.get("/today", response_model=TaskTodayResponse)
async def get_today_tasks(current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await task_service.get_daily_tasks(db, current_user_id)
    return {"success": True, "data": data, "message": "Today's tasks"}

@router.post("/{task_id}/complete", response_model=TaskActionResponse)
async def complete_task(task_id: UUID, request: Optional[TaskCompleteRequest] = None, current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await task_service.complete_task(db, current_user_id, task_id, request)
    return {"success": True, "data": data, "message": "Task completed"}

@router.post("/{task_id}/skip", response_model=TaskActionResponse)
async def skip_task(task_id: UUID, request: Optional[TaskSkipRequest] = None, current_user_id: UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    data = await task_service.skip_task(db, current_user_id, task_id, request)
    return {"success": True, "data": data, "message": "Task skipped"}
