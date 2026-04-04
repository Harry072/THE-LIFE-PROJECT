from sqlalchemy.orm import Session
from uuid import UUID
from app.models.progress import Progress
from app.models.tree import TreeState

class ProgressService:
    async def get_user_progress(self, db: Session, user_id: UUID):
        progress = db.query(Progress).filter(Progress.user_id == user_id).first()
        if not progress:
            progress = Progress(user_id=user_id)
            db.add(progress)
            db.commit()
            db.refresh(progress)
        return progress

    async def get_user_tree(self, db: Session, user_id: UUID):
        tree = db.query(TreeState).filter(TreeState.user_id == user_id).first()
        if not tree:
            tree = TreeState(user_id=user_id)
            db.add(tree)
            db.commit()
            db.refresh(tree)
        return tree

progress_service = ProgressService()
