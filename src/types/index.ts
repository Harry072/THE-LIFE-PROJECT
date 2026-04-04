export interface User {
  id: string;
  email: string;
  full_name: string;
  profile_image_url?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface Question {
  question_key: string;
  question_text: string;
  category: string;
  order: number;
  options: string[];
}

export interface OnboardingQuestions {
  session_id: string;
  version: string;
  questions: Question[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  duration_minutes: number;
  status: 'pending' | 'completed' | 'skipped';
  optional: boolean;
}

export interface TodayTasks {
  date: string;
  tasks: Task[];
}

export interface Reflection {
  reflection_id: string;
  date: string;
  mood_label?: string;
  reflection_text: string;
  main_obstacle?: string;
  emotional_tone?: string;
  ai_summary?: string;
  next_step_suggestion?: string;
}

export interface ProgressSummary {
  xp: number;
  streak: number;
  completed_task_count: number;
  skipped_task_count: number;
  reflection_count: number;
  last_active_date: string;
  current_focus_area: string;
}

export interface TreeState {
  tree_score: number;
  tree_stage: string;
  growth_percentage: number;
  last_growth_at: string;
}

export interface MeditationCategory {
  slug: string;
  title: string;
  description: string;
  default_duration_minutes: number;
}

export interface MeditationRecommendation {
  category_slug: string;
  title: string;
  duration_minutes: number;
  context: string;
}
