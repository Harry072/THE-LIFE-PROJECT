from typing import List, Dict
from app.integrations.gemini_client import gemini_client

class TaskGenerationEngine:
    @staticmethod
    def get_base_tasks(user_type: str) -> List[Dict]:
        """Rule-based task selection."""
        return [
            {"title": "Morning Reflection", "category": "reflection", "duration": 5},
            {"title": "Deep Work Session", "category": "focus", "duration": 25},
            {"title": "Digital Detox", "category": "discipline", "duration": 15}
        ]

    async def personalize_task(self, task_title: str, user_tone: str) -> str:
        """AI-based task wording personalization."""
        prompt = f"Task: {task_title}. Tone: {user_tone}. Rewrite this task description to be more motivating and friendly."
        return await gemini_client.generate_text(prompt)

task_gen_engine = TaskGenerationEngine()
