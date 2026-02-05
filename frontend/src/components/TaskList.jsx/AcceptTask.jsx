import React from 'react'
import api from '../../utils/api';
import { FiActivity, FiCheckCircle, FiXCircle, FiClock, FiTag } from 'react-icons/fi';

const AcceptTask = ({ data, onStatusChange }) => {
  const markAsCompleted = async () => {
    try {
      await api.patch(`/tasks/${data._id}`, { status: 'completed' });
      if (onStatusChange) onStatusChange();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const markAsFailed = async () => {
    try {
      await api.patch(`/tasks/${data._id}`, { status: 'failed' });
      if (onStatusChange) onStatusChange();
    } catch (error) {
      console.error("Error failing task:", error);
    }
  };

  const priorityColors = {
    high: 'bg-red-50 text-red-700 border-red-100',
    medium: 'bg-amber-50 text-amber-700 border-amber-100',
    low: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  };

  const currentPriorityColor = priorityColors[data.priority] || priorityColors.medium;

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 p-8 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-amber-500 animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors duration-300 blur-2xl opacity-50"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border border-amber-100 shadow-sm">
            <FiActivity className="w-3.5 h-3.5 animate-spin duration-2000" />
            Active Objective
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-400 rounded-xl border border-slate-100">
            <FiClock className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-wider">{new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mb-4 px-1">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
          <p className="text-[11px] font-black text-amber-600 uppercase tracking-widest">{data.category}</p>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-4 leading-[1.2] group-hover:text-amber-600 transition-colors">
          {data.title}
        </h3>

        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 mb-8">
          {data.description}
        </p>
      </div>

      <div className="pt-6 border-t border-slate-50 relative z-10 flex gap-4">
        <button
          onClick={markAsCompleted}
          className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/10 active:scale-95"
        >
          <FiCheckCircle className="w-4 h-4" />
          Finalize
        </button>
        <button
          onClick={markAsFailed}
          className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-white hover:bg-rose-50 text-rose-600 border border-rose-100 text-xs font-black rounded-2xl transition-all duration-200 active:scale-95"
        >
          <FiXCircle className="w-4 h-4" />
          Archive
        </button>
      </div>
    </div>
  );
}

export default AcceptTask;
