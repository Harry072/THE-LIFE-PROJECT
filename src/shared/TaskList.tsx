import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  category: string;
  type: string;
  duration: number;
  status: string;
}

interface TaskListProps {
  tasks?: Task[];
  isLoading?: boolean;
}

export const TaskList = ({ tasks = [], isLoading = false }: TaskListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-white border border-[#E8E4E1] rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-12 text-center bg-white border border-[#E8E4E1] rounded-2xl">
        <p className="text-[#2D2D2D] opacity-40">No tasks for today. Rest and reflect.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="flex items-center justify-between p-4 bg-white border border-[#E8E4E1] rounded-2xl hover:border-[#2D2D2D] transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            {task.status === "completed" ? (
              <CheckCircle2 className="h-6 w-6 text-[#2D2D2D]" />
            ) : (
              <Circle className="h-6 w-6 text-[#E8E4E1] group-hover:text-[#2D2D2D]" />
            )}
            <div>
              <p className={`font-medium ${task.status === "completed" ? 'line-through opacity-40' : 'text-[#2D2D2D]'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
                  {task.type || task.category}
                </span>
                <span className="text-[10px] opacity-40">•</span>
                <span className="text-[10px] opacity-40 font-medium">
                  {task.duration} mins
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
