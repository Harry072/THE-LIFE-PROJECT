import axios, { AxiosResponse } from "axios";
import { useUserStore } from "../store/useUserStore";
import { ApiResponse } from "../types";

export type AnalysisResponse = {
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
};

export type TasksResponse = {
  tasks: {
    id: string;
    title: string;
    description: string;
    category: string;
    type: "focus" | "reflection" | "health";
    duration: number;
    status: string;
    date: string;
  }[];
};

export type ReflectionResponse = {
  reflections: {
    id: string | number;
    text: string;
    mood: string | number;
    created_at: string;
  }[];
};

export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for JWT
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for standardized error handling
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    if (!response.data.success) {
      return Promise.reject(new Error(response.data.message || "An unexpected error occurred"));
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

// API Endpoints
export const onboardingService = {
  submit: async (userId: string, answers: { question_key: string; answer: string }[]): Promise<AnalysisResponse> => {
    const response = await api.post<ApiResponse<AnalysisResponse>>("/onboarding", {
      user_id: userId,
      answers,
    });
    return response.data.data;
  },
};

export const analysisService = {
  get: async (userId: string): Promise<AnalysisResponse> => {
    const response = await api.get<ApiResponse<AnalysisResponse>>(`/analysis?user_id=${userId}`);
    return response.data.data;
  },
};

export const taskService = {
  get: async (userId: string): Promise<TasksResponse> => {
    const response = await api.get<ApiResponse<TasksResponse>>(`/tasks?user_id=${userId}`);
    return response.data.data;
  },
};

export const reflectionService = {
  submit: async (userId: string, reflectionText: string, moodLabel: string = "neutral"): Promise<ReflectionResponse> => {
    const response = await api.post<ApiResponse<ReflectionResponse>>("/reflection", {
      user_id: userId,
      reflection_text: reflectionText,
      mood_label: moodLabel,
    });
    return response.data.data;
  },
  getHistory: async (userId: string): Promise<ReflectionResponse> => {
    const response = await api.get<ApiResponse<ReflectionResponse>>(`/reflection/history?user_id=${userId}`);
    return response.data.data;
  },
};
