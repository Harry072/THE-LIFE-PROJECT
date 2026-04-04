import React from "react";
import { Navbar } from "../Navbar";

export default function TreePage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] pb-24 md:pt-24">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-serif italic text-[#2D2D2D] mb-2">
            Your Growth Tree
          </h1>
          <p className="text-[#2D2D2D] opacity-60">
            Visualize your personal evolution.
          </p>
        </header>

        <div className="aspect-square max-w-md mx-auto bg-white border border-[#E8E4E1] rounded-3xl flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-48 h-48 bg-[#F5F5F5] rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-8xl">🌱</span>
            </div>
            <p className="text-lg font-medium text-[#2D2D2D]">Level 4 Sapling</p>
            <p className="text-sm opacity-40">1,240 XP total</p>
          </div>
        </div>
      </div>
    </main>
  );
}
