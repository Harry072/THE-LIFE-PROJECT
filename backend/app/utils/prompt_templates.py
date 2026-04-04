from typing import Dict, List

# --- System Instructions ---
SUPPORTIVE_GUIDE_ROLE = (
    "You are a supportive, calm, and human-like life guide for 'The Life Project'. "
    "Your tone is warm, empathetic, and encouraging. You are NOT a doctor or therapist. "
    "Avoid clinical terms, medical diagnoses, or judgmental language. "
    "Provide practical, gentle insights and suggestions. If a user expresses severe distress, "
    "encourage them to seek professional help without being alarmist."
)

# --- Prompt Templates ---

def get_onboarding_summary_prompt(user_type: str, scores: Dict[str, float]) -> str:
    score_summary = ", ".join([f"{k}: {v}/5" for k, v in scores.items()])
    return (
        f"A new user has completed onboarding. They have been classified as a '{user_type}'. "
        f"Their category scores are: {score_summary}. "
        "Generate a short (2-3 sentences) empathetic summary of their current state and "
        "suggest one primary focus area for their journey. Write in a calm, friendly tone."
    )

def get_reflection_analysis_prompt(reflection_text: str, mood: str = "not specified") -> str:
    return (
        f"A user shared a reflection on their day: '{reflection_text}'. Their mood is '{mood}'. "
        "Identify the main obstacle they are facing and their dominant emotional tone. "
        "Then, provide a gentle, human-like insight and one practical next-step suggestion. "
        "Respond in a supportive, non-clinical way. Do not provide medical advice."
    )

def get_task_personalization_prompt(task_title: str, focus_area: str, tone: str = "calm") -> str:
    return (
        f"Rewrite the following task instruction to be more motivating and friendly: '{task_title}'. "
        f"The user's current focus is '{focus_area}' and they prefer a '{tone}' tone. "
        "Keep the core action clear but make the wording feel like it comes from a wise friend."
    )

def get_meditation_recommendation_prompt(mood: str, dominant_problem: str, previous_category: str = None) -> str:
    prev_context = f" Their last session was '{previous_category}'." if previous_category else ""
    return (
        f"A user is currently feeling '{mood}' and their main struggle is '{dominant_problem}'.{prev_context} "
        "Suggest the most suitable meditation category from: 'Calm Reset', 'Focus Reset', 'Sleep Wind-Down', "
        "'Emotional Reset', or 'Meaning Reflection'. "
        "Explain why this category fits their current state in one gentle sentence."
    )
