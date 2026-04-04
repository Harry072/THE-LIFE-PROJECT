import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TaskList } from "../shared/TaskList";
import { ProgressCard } from "../shared/ProgressCard";
import { Navbar } from "../Navbar";
import { analysisService, taskService, AnalysisResponse, TasksResponse } from "../services/api";
import { useUserStore, UserTask } from "../store/useUserStore";

export default function Dashboard() {
  const { user, analysis, tasks, setAnalysis, setTasks } = useUserStore();
  const userId = user?.id || "guest_user";

  const analysisQuery = useQuery<AnalysisResponse>({
    queryKey: ["analysis", userId],
    queryFn: () => analysisService.get(userId),
    enabled: !!userId,
  });

  const tasksQuery = useQuery<TasksResponse>({
    queryKey: ["tasks", userId],
    queryFn: () => taskService.get(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (analysisQuery.data) setAnalysis(analysisQuery.data);
  }, [analysisQuery.data, setAnalysis]);

  useEffect(() => {
    if (tasksQuery.data?.tasks) {
      setTasks(tasksQuery.data.tasks as unknown as UserTask[]);
    }
  }, [tasksQuery.data, setTasks]);

  const scores = analysis?.scores || { focus: 0, discipline: 0, sleep: 0, purpose: 0 };

  return (
    <main className="min-h-screen bg-[#FDFCFB] pb-24 md:pt-24">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-serif italic text-[#2D2D2D] mb-2">
            Welcome back, {user?.full_name || "Harry"}
          </h1>
          <p className="text-[#2D2D2D] opacity-60">
            {analysis?.userType || "Your journey continues"}. {analysis?.mainProblem || "One small step today."}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <ProgressCard
            title="Focus"
            value={String(scores.focus)}
            subtitle="pts"
            icon="streak"
          />
          <ProgressCard
            title="Discipline"
            value={String(scores.discipline)}
            subtitle="pts"
            icon="xp"
          />
          <ProgressCard
            title="Sleep"
            value={String(scores.sleep)}
            subtitle="pts"
            icon="level"
          />
          <ProgressCard
            title="Purpose"
            value={String(scores.purpose)}
            subtitle="pts"
            icon="streak"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-[#E8E4E1]">
            <h3 className="text-xs font-medium uppercase tracking-widest opacity-40 mb-2">Meaning</h3>
            <p className="text-sm text-[#2D2D2D] leading-relaxed">{analysis?.meaning || "Your current path and its significance."}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E8E4E1]">
            <h3 className="text-xs font-medium uppercase tracking-widest opacity-40 mb-2">Direction</h3>
            <p className="text-sm text-[#2D2D2D] leading-relaxed">{analysis?.direction || "The recommended next steps for your journey."}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E8E4E1]">
            <h3 className="text-xs font-medium uppercase tracking-widest opacity-40 mb-2">Insight</h3>
            <p className="text-sm text-[#2D2D2D] leading-relaxed">{analysis?.insight || "A key observation about your current state."}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-[#2D2D2D]">Daily Tasks</h2>
              <span className="text-xs font-medium uppercase tracking-widest opacity-40">
                {tasks?.length || 0} tasks remaining
              </span>
            </div>
            <TaskList tasks={tasks || []} isLoading={tasksQuery.isLoading} />
          </section>

          <aside>
            <h2 className="text-xl font-medium text-[#2D2D2D] mb-6">Your Growth</h2>
            <div className="aspect-square bg-white border border-[#E8E4E1] rounded-3xl flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-[#F5F5F5] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">🌱</span>
                </div>
                <p className="text-sm font-medium opacity-40">Your tree is thriving</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
