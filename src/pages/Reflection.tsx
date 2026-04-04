import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navbar } from "../Navbar";
import { BookOpen } from "lucide-react";
import { reflectionService, ReflectionResponse } from "../services/api";
import { useUserStore, UserReflection } from "../store/useUserStore";

export default function ReflectionPage() {
  const [text, setText] = useState("");
  const { user, reflections, setReflections } = useUserStore();
  const userId = user?.id || "guest_user";

  const historyQuery = useQuery<ReflectionResponse>({
    queryKey: ["reflections", userId],
    queryFn: () => reflectionService.getHistory(userId),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: (data: { userId: string; text: string }) => 
      reflectionService.submit(data.userId, data.text),
    onSuccess: (data: ReflectionResponse) => {
      setReflections(data.reflections as unknown as UserReflection[]);
      setText("");
    }
  });

  useEffect(() => {
    if (historyQuery.data?.reflections) {
      setReflections(historyQuery.data.reflections as unknown as UserReflection[]);
    }
  }, [historyQuery.data, setReflections]);

  const handleSave = () => {
    if (!text.trim()) return;
    mutation.mutate({ userId, text });
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] pb-24 md:pt-24">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-serif italic text-[#2D2D2D] mb-2">
            Daily Reflection
          </h1>
          <p className="text-[#2D2D2D] opacity-60">
            Take a moment to pause and look within.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E8E4E1] rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#F5F5F5] rounded-2xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[#2D2D2D]" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-[#2D2D2D]">Today's Entry</h2>
                  <p className="text-sm opacity-40">{new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <textarea 
                className="w-full h-64 p-6 bg-[#FDFCFB] border border-[#E8E4E1] rounded-2xl focus:outline-none focus:border-[#2D2D2D] transition-colors resize-none text-lg"
                placeholder="How are you feeling today? What's on your mind?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={mutation.isPending}
              />

              <div className="mt-8 flex justify-end">
                <button 
                  className="bg-[#2D2D2D] text-white px-8 py-3 rounded-full font-medium hover:bg-[#404040] transition-colors disabled:opacity-50"
                  onClick={handleSave}
                  disabled={mutation.isPending || !text.trim()}
                >
                  {mutation.isPending ? "Saving..." : "Save Reflection"}
                </button>
              </div>
            </div>
          </div>

          <aside>
            <h2 className="text-xl font-medium text-[#2D2D2D] mb-6">History</h2>
            <div className="space-y-4">
              {reflections?.map((entry) => (
                <div key={entry.id} className="p-4 bg-white border border-[#E8E4E1] rounded-2xl">
                  <p className="text-xs opacity-40 mb-2">{entry.created_at}</p>
                  <p className="text-sm text-[#2D2D2D] line-clamp-3">{entry.text}</p>
                </div>
              ))}
              {(!reflections || reflections.length === 0) && (
                <p className="text-sm opacity-40 italic">No history yet.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
