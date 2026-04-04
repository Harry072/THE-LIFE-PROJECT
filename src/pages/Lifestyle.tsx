import React from "react";
import { Navbar } from "../Navbar";
import { Sparkles } from "lucide-react";

export default function LifestylePage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] pb-24 md:pt-24">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-serif italic text-[#2D2D2D] mb-2">
            Lifestyle Design
          </h1>
          <p className="text-[#2D2D2D] opacity-60">
            Craft your daily routine for peace and purpose.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#E8E4E1] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#F5F5F5] rounded-2xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-[#2D2D2D]" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#2D2D2D]">Daily Routine</h2>
                <p className="text-sm opacity-40">Optimize your day</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#FDFCFB] border border-[#E8E4E1] rounded-2xl">
                <div>
                  <p className="font-medium text-[#2D2D2D]">Morning Meditation</p>
                  <p className="text-xs opacity-40 uppercase tracking-widest">15 minutes</p>
                </div>
                <div className="w-10 h-10 bg-[#E8E4E1] rounded-full flex items-center justify-center">
                  <span className="text-sm">🧘</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#FDFCFB] border border-[#E8E4E1] rounded-2xl">
                <div>
                  <p className="font-medium text-[#2D2D2D]">Focused Work</p>
                  <p className="text-xs opacity-40 uppercase tracking-widest">90 minutes</p>
                </div>
                <div className="w-10 h-10 bg-[#E8E4E1] rounded-full flex items-center justify-center">
                  <span className="text-sm">💻</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#FDFCFB] border border-[#E8E4E1] rounded-2xl">
                <div>
                  <p className="font-medium text-[#2D2D2D]">Evening Reflection</p>
                  <p className="text-xs opacity-40 uppercase tracking-widest">10 minutes</p>
                </div>
                <div className="w-10 h-10 bg-[#E8E4E1] rounded-full flex items-center justify-center">
                  <span className="text-sm">🌙</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E8E4E1] rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-medium text-[#2D2D2D] mb-6">Focus Areas</h2>
            <div className="space-y-4">
              <div className="p-6 bg-[#FDFCFB] border border-[#E8E4E1] rounded-2xl">
                <p className="text-sm opacity-40 uppercase tracking-widest mb-2">Current Focus</p>
                <p className="text-2xl font-serif italic text-[#2D2D2D]">Intentional Living</p>
              </div>
              <div className="p-6 bg-[#FDFCFB] border border-[#E8E4E1] rounded-2xl">
                <p className="text-sm opacity-40 uppercase tracking-widest mb-2">Secondary Focus</p>
                <p className="text-2xl font-serif italic text-[#2D2D2D]">Physical Vitality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
