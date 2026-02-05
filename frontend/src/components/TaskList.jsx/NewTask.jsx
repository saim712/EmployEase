import React from 'react'
import api from '../../utils/api';
import { FiClock, FiTag, FiAlertCircle } from 'react-icons/fi';

const NewTask = ({ data, onStatusChange }) => {
  const handleAcceptTask = async () => {
    try {
      await api.patch(`/tasks/${data._id}`, { status: 'active' });
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Error accepting task:", error);
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
      {/* Decorative Blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors duration-300 blur-2xl opacity-50"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border-2 shadow-sm ${currentPriorityColor}`}>
            {data.priority || 'medium'}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-400 rounded-xl border border-slate-100">
            <FiClock className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-wider">{new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mb-4 px-1">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          <p className="text-[11px] font-black text-indigo-500/80 uppercase tracking-widest">{data.category}</p>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-4 leading-[1.2] group-hover:text-indigo-600 transition-colors">
          {data.title}
        </h3>

        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 mb-8">
          {data.description}
        </p>
      </div>

      <div className="pt-6 border-t border-slate-50 relative z-10">
        <button
          onClick={handleAcceptTask}
          className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white text-sm font-black rounded-2xl transition-all duration-200 shadow-lg shadow-slate-900/10 hover:shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2"
        >
          Begin Objective
          <FiAlertCircle className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}

export default NewTask;
