class GamificationEngine:
    @staticmethod
    def calculate_xp(action_type: str) -> int:
        """Rule-based XP rewards."""
        rewards = {
            "task_complete": 10,
            "reflection_complete": 15,
            "meditation_complete": 20
        }
        return rewards.get(action_type, 0)

    @staticmethod
    def update_streak(last_active_date, current_date) -> int:
        """Rule-based streak logic."""
        return 1 # Placeholder for date diff logic

gamification_engine = GamificationEngine()
