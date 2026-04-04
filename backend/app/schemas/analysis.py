from typing import List, Dict, Optional
from pydantic import BaseModel
from uuid import UUID
from .auth import BaseResponse

class AnalysisTask(BaseModel):
    id: UUID
    title: str
    description: Optional[str] = None
    category: str
    duration_minutes: int
    optional: bool

class RecommendedMeditation(BaseModel):
    category_slug: str
    title: str
    duration_minutes: int

class AnalysisResultData(BaseModel):
    analysis_result_id: UUID
    user_type: str
    dominant_problem: str
    secondary_problem: Optional[str] = None
    category_scores: Dict[str, float]
    summary: str
    first_tasks: List[AnalysisTask]
    recommended_meditation: RecommendedMeditation
    reflection_prompt: str

class AnalysisResultResponse(BaseResponse[AnalysisResultData]):
    pass
