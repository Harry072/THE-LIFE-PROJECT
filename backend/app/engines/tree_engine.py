class TreeEngine:
    @staticmethod
    def get_stage(score: float) -> str:
        """Rule-based tree stage determination."""
        if score < 100: return "Seed"
        if score < 500: return "Sprout"
        if score < 2000: return "Sapling"
        return "Mature Tree"

    @staticmethod
    def calculate_growth(xp_gained: int) -> float:
        """Rule-based growth percentage."""
        return xp_gained * 0.1

tree_engine = TreeEngine()
