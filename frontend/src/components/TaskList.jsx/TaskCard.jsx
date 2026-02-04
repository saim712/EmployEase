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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* Top Accent Bar */}
            <div className={`absolute top-0 left-0 w-full h-1.5 ${card.accent}`}></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{card.title}</p>
                <p className={`text-3xl font-extrabold ${card.color}`}>{card.count}</p>
              </div>
              <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center shadow-inner`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskCard;
