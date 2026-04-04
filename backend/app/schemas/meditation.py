from typing import List, Optional
from pydantic import BaseModel
from .auth import BaseResponse

class MeditationCategorySchema(BaseModel):
    slug: str
    title: str
    description: Optional[str] = None
    default_duration_minutes: int

class MeditationCategoriesData(BaseModel):
    categories: List[MeditationCategorySchema]

class MeditationCategoriesResponse(BaseResponse[MeditationCategoriesData]):
    pass

class MeditationRecommendationData(BaseModel):
    category_slug: str
    title: str
    duration_minutes: int
    context: str

class MeditationRecommendationResponse(BaseResponse[MeditationRecommendationData]):
    pass
