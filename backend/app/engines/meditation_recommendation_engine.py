from app.integrations.gemini_client import gemini_client

class MeditationRecommendationEngine:
    async def get_recommendation(self, user_state: str) -> str:
        """AI-based meditation fit."""
        prompt = f"User is feeling {user_state}. Suggest one of: Calm Reset, Focus Reset, or Sleep Wind-Down. Explain why in 1 sentence."
        return await gemini_client.generate_text(prompt)

meditation_engine = MeditationRecommendationEngine()
