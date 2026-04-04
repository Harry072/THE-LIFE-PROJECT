from sqlalchemy.orm import Session
from uuid import UUID
from datetime import date
from app.models.task import Task
from app.engines.task_generation_engine import task_gen_engine

class TaskService:
    async def get_daily_tasks(self, db: Session, user_id: UUID):
        today = date.today()
        tasks = db.query(Task).filter(Task.user_id == user_id, Task.scheduled_date == today).all()
        
        if not tasks:
            base_tasks = task_gen_engine.get_base_tasks("Distracted User")
            for bt in base_tasks:
                new_task = Task(
                    user_id=user_id,
                    title=bt['title'],
                    category=bt['category'],
                    duration_minutes=bt['duration'],
                    scheduled_date=today,
                    task_type="daily"
                )
                db.add(new_task)
            db.commit()
            tasks = db.query(Task).filter(Task.user_id == user_id, Task.scheduled_date == today).all()
            
        return {"date": today, "tasks": tasks}

    async def complete_task(self, db: Session, user_id: UUID, task_id: UUID, request):
        task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
        if task:
            task.status = "completed"
            db.commit()
            return {"task_id": task_id, "status": "completed"}
        return None

    async def skip_task(self, db: Session, user_id: UUID, task_id: UUID, request):
        task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
        if task:
            task.status = "skipped"
            db.commit()
            return {"task_id": task_id, "status": "skipped"}
        return None

task_service = TaskService()
