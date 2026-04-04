from typing import Dict, Optional
from app.integrations.gemini_client import gemini_client

class AnalysisEngine:
    USER_TYPES = [
        "Distracted User", "Undisciplined User", "Anxious / Overloaded User",
        "Directionless User", "Low-Energy / Poor Recovery User", "Balanced but Inconsistent User"
    ]

    @staticmethod
    def classify_user(scores: Dict[str, float]) -> str:
        """Rule-based classification based on highest problem score."""
        if not scores: return "Balanced but Inconsistent User"
        
        max_cat = max(scores, key=scores.get)
        mapping = {
            "distraction": "Distracted User",
            "discipline": "Undisciplined User",
            "anxiety": "Anxious / Overloaded User",
            "meaning": "Directionless User",
            "sleep": "Low-Energy / Poor Recovery User"
        }
        return mapping.get(max_cat, "Balanced but Inconsistent User")

    async def generate_summary(self, user_type: str, scores: Dict[str, float]) -> str:
        """AI-based summary generation."""
        prompt = f"User Type: {user_type}. Scores: {scores}. Generate a 2-3 sentence empathetic summary of their current state."
        system_instruction = "You are a supportive life guide. Be warm, non-clinical, and encouraging. Do not diagnose."
        return await gemini_client.generate_text(prompt, system_instruction)

analysis_engine = AnalysisEngine()
