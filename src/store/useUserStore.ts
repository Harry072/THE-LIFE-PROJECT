import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";

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
  status: string;
  date: string;
}

export interface UserReflection {
  id: string | number;
  user_id: string;
  created_at: string;
  text: string;
  mood: string | number;
}

interface UserState {
  user: User | null;
  token: string | null;
  onboardingCompleted: boolean;
  analysis: UserAnalysis | null;
  tasks: UserTask[] | null;
  reflections: UserReflection[] | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  setAnalysis: (analysis: UserAnalysis) => void;
  setTasks: (tasks: UserTask[]) => void;
  setReflections: (reflections: UserReflection[]) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      onboardingCompleted: false,
      analysis: null,
      tasks: null,
      reflections: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),
      setAnalysis: (analysis) => set({ analysis }),
      setTasks: (tasks) => set({ tasks }),
      setReflections: (reflections) => set({ reflections }),
      logout: () => set({ user: null, token: null, onboardingCompleted: false, analysis: null, tasks: null, reflections: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
