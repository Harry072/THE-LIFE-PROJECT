import React from "react";
import { Flame, Zap, TreePine } from "lucide-react";

interface ProgressCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: "streak" | "xp" | "level";
}

export const ProgressCard = ({ title, value, subtitle, icon }: ProgressCardProps) => {
  const icons = {
    streak: <Flame className="h-6 w-6 text-[#FF6321]" />,
    xp: <Zap className="h-6 w-6 text-[#FFD700]" />,
    level: <TreePine className="h-6 w-6 text-[#2D5A27]" />,
  };

  return (
    <div className="bg-white border border-[#E8E4E1] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium uppercase tracking-widest opacity-40">
          {title}
        </span>
        {icons[icon]}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-serif italic text-[#2D2D2D]">{value}</span>
        <span className="text-sm font-medium opacity-40">{subtitle}</span>
      </div>
    </div>
  );
};
