import { v4 as uuidv4 } from 'uuid';

export interface Answer {
  question_key: string;
  answer: string;
}

export interface UserAnalysis {
  userType: string;
  mainProblem: string;
  scores: {
    focus: number;
    discipline: number;
    sleep: number;
    purpose: number;
  };
  meaning: string;
  direction: string;
  insight: string;
}

export interface UserTask {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  type: "focus" | "reflection" | "health";
  duration_minutes: number;
  duration: number;
  date: string;
  status?: string;
}

export function analyzeResponses(answers: Answer[]): UserAnalysis {
  const scores = {
    focus: 0,
    discipline: 0,
    sleep: 0,
    purpose: 0
  };

  for (const ans of answers) {
    const text = ans.answer.toLowerCase();
    if (text.includes("rarely") || text.includes("never")) {
      if (ans.question_key === "focus") scores.focus -= 2;
    } else if (text.includes("often") || text.includes("usually") || text.includes("always")) {
      if (ans.question_key === "focus") scores.focus += 1;
    }

    if (text.includes("struggle") || text.includes("inconsistent")) {
      if (ans.question_key === "discipline") scores.discipline -= 2;
    } else if (text.includes("consistent") || text.includes("mostly")) {
      if (ans.question_key === "discipline") scores.discipline += 1;
    }

    if (text.includes("poor") || text.includes("difficulty")) {
      if (ans.question_key === "sleep") scores.sleep -= 2;
    } else if (text.includes("good") || text.includes("excellent")) {
      if (ans.question_key === "sleep") scores.sleep += 1;
    }

    if (text.includes("unsure") || text.includes("lack") || text.includes("not at all")) {
      if (ans.question_key === "purpose") scores.purpose -= 2;
    } else if (text.includes("clear") || text.includes("driven") || text.includes("completely")) {
      if (ans.question_key === "purpose") scores.purpose += 1;
    }
  }

  // Clamp scores between -5 and 5
  for (const key in scores) {
    (scores as Record<string, number>)[key] = Math.max(-5, Math.min(5, (scores as Record<string, number>)[key]));
  }

  let userType = "Balanced";
  let mainProblem = "No major issues detected.";
  let meaning = "You are currently in a state of balance, ready to take on new challenges.";
  let direction = "Maintain your current habits while exploring deeper areas of growth.";
  let insight = "Consistency is your greatest strength. Keep showing up for yourself.";

  if (scores.focus < -1 || scores.discipline < -1) {
    userType = "Struggling";
    mainProblem = "Needs to build focus and discipline.";
    meaning = "Your current path is hindered by distractions and inconsistent action.";
    direction = "Focus on small, daily wins to rebuild your foundation of discipline.";
    insight = "Discipline is a muscle. Start with 15 minutes of focused work today.";
  } else if (scores.purpose < -1) {
    userType = "Searching";
    mainProblem = "Needs to clarify life purpose.";
    meaning = "You are moving, but you're not entirely sure where you're going.";
    direction = "Spend time in reflection to align your actions with your core values.";
    insight = "Clarity comes from action, but direction comes from silence.";
  } else if (scores.sleep < -1) {
    userType = "Tired";
    mainProblem = "Needs to prioritize rest and recovery.";
    meaning = "Your ambition is outrunning your energy levels.";
    direction = "Prioritize sleep and recovery to sustain your long-term growth.";
    insight = "A sharp mind requires a rested body. Sleep is not a luxury.";
  }

  return { userType, mainProblem, scores, meaning, direction, insight };
}

export function generateTasks(userId: string, analysis: UserAnalysis): UserTask[] {
  const tasks: UserTask[] = [];
  const today = new Date().toISOString().split('T')[0];

  if (analysis.userType === "Struggling" || analysis.scores.focus < 0) {
    tasks.push({
      id: uuidv4(),
      user_id: userId,
      title: "15-Minute Deep Work Session",
      description: "Focus on a single task without distractions.",
      category: "focus",
      type: "focus",
      duration_minutes: 15,
      duration: 15,
      date: today
    });
  }

  if (analysis.userType === "Searching" || analysis.scores.purpose < 0) {
    tasks.push({
      id: uuidv4(),
      user_id: userId,
      title: "Journal on Your Values",
      description: "Write down what truly matters to you.",
      category: "reflection",
      type: "reflection",
      duration_minutes: 10,
      duration: 10,
      date: today
    });
  }

  if (analysis.userType === "Tired" || analysis.scores.sleep < 0) {
    tasks.push({
      id: uuidv4(),
      user_id: userId,
      title: "30-Minute Walk Outdoors",
      description: "Get some fresh air and light exercise.",
      category: "health",
      type: "health",
      duration_minutes: 30,
      duration: 30,
      date: today
    });
  }

  // Default tasks
  if (tasks.length < 3) {
    tasks.push({
      id: uuidv4(),
      user_id: userId,
      title: "Plan Your Day",
      description: "Outline your key priorities.",
      category: "focus",
      type: "focus",
      duration_minutes: 5,
      duration: 5,
      date: today
    });
  }
  if (tasks.length < 3) {
    tasks.push({
      id: uuidv4(),
      user_id: userId,
      title: "Mindful Breathing Exercise",
      description: "Take 5 minutes to focus on your breath.",
      category: "health",
      type: "health",
      duration_minutes: 5,
      duration: 5,
      date: today
    });
  }
  if (tasks.length < 3) {
    tasks.push({
      id: uuidv4(),
      user_id: userId,
      title: "Gratitude Practice",
      description: "List three things you are grateful for.",
      category: "reflection",
      type: "reflection",
      duration_minutes: 5,
      duration: 5,
      date: today
    });
  }

  return tasks.slice(0, 3);
}
