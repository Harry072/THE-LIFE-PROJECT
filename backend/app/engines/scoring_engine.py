from typing import List, Dict
from app.schemas.onboarding import OnboardingAnswerSubmit

class ScoringEngine:
    @staticmethod
    def calculate_scores(answers: List[OnboardingAnswerSubmit]) -> Dict[str, float]:
        """
        Rule-based scoring: Aggregates scores by category.
        Assumes answer_score is 1-4.
        """
        # In Phase 1, we use a simplified mapping for the scaffold
        category_totals = {"distraction": 0.0, "discipline": 0.0, "sleep": 0.0, "anxiety": 0.0, "meaning": 0.0}
        category_counts = {"distraction": 0, "discipline": 0, "sleep": 0, "anxiety": 0, "meaning": 0}
        
        for ans in answers:
            # Mocking logic: in production, question_key would map to a category
            category = "distraction" # Default for scaffold
            category_totals[category] += 3.0 # Mock score
            category_counts[category] += 1

        scores = {cat: (category_totals[cat] / max(category_counts[cat], 1)) for cat in category_totals}
        return scores

scoring_engine = ScoringEngine()
