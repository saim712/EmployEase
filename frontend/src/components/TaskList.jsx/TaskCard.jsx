import React from "react";
import { FiClock, FiCheckCircle, FiAlertCircle, FiXCircle } from "react-icons/fi";

function TaskCard({ tasks }) {
  const stats = {
    new: tasks.filter(t => t.status === 'new').length,
    active: tasks.filter(t => t.status === 'active').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    failed: tasks.filter(t => t.status === 'failed').length,
  };

  const cards = [
    {
      title: "New",
      count: stats.new,
      icon: FiClock,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      accent: "bg-blue-600"
    },
    {
      title: "Active",
      count: stats.active,
      icon: FiAlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      accent: "bg-amber-600"
    },
    {
      title: "Finished",
      count: stats.completed,
      icon: FiCheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      accent: "bg-emerald-600"
    },
    {
      title: "Failed",
      count: stats.failed,
      icon: FiXCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
      accent: "bg-red-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Background Decoration */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${card.bg} rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>

            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center shadow-lg shadow-current/5 border border-white/50 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                {/* Visual Status Indicator */}
                <div className="flex gap-1">
                  <div className={`w-1 h-3 rounded-full ${card.accent} opacity-20`}></div>
                  <div className={`w-1 h-5 rounded-full ${card.accent} opacity-40`}></div>
                  <div className={`w-1 h-3 rounded-full ${card.accent} opacity-20`}></div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{card.title} Missions</p>
                <div className="flex items-end gap-2">
                  <span className={`text-4xl font-black text-slate-900 tracking-tighter`}>{card.count}</span>
                  <span className="text-xs font-bold text-slate-300 mb-1.5">assignments</span>
                </div>
              </div>

              {/* Progress Line Simulation */}
              <div className="mt-6 w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                <div className={`h-full ${card.accent} w-1/3 opacity-20 group-hover:w-full transition-all duration-700`}></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskCard;
