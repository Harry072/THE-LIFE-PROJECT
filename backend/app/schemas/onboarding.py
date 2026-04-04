from typing import List, Optional
from pydantic import BaseModel
from uuid import UUID
from .auth import BaseResponse

class OnboardingQuestion(BaseModel):
    question_key: str
    question_text: str
    category: str
    order: int
    options: List[str] = ["strongly agree", "agree", "disagree", "strongly disagree"]

class OnboardingQuestionsData(BaseModel):
    session_id: UUID
    version: str
    questions: List[OnboardingQuestion]

class OnboardingQuestionsResponse(BaseResponse[OnboardingQuestionsData]):
    pass

class OnboardingAnswerSubmit(BaseModel):
    question_key: str
    answer: str

class OnboardingSubmitRequest(BaseModel):
    session_id: UUID
    answers: List[OnboardingAnswerSubmit]

class OnboardingSubmitData(BaseModel):
    analysis_result_id: UUID

class OnboardingSubmitResponse(BaseResponse[OnboardingSubmitData]):
    pass
