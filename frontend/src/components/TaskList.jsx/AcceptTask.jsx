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
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Status Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 animate-pulse"></div>

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-bold uppercase ring-1 ring-amber-100">
            <FiActivity className="w-3 h-3 animate-spin duration-1000" />
            In Progress
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <FiClock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">{new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <FiTag className="text-amber-400 w-4 h-4" />
          <p className="text-xs font-bold text-amber-600 uppercase tracking-tight">{data.category}</p>
        </div>

        <h3 className="text-lg font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-amber-600 transition-colors">
          {data.title}
        </h3>

        <p className="text-sm text-gray-500 font-medium line-clamp-3 mb-6">
          {data.description}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-50 flex gap-3">
        <button
          onClick={markAsCompleted}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
        >
          <FiCheckCircle className="w-3.5 h-3.5" />
          Finish
        </button>
        <button
          onClick={markAsFailed}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-100 text-xs font-bold rounded-xl transition-all active:scale-95"
        >
          <FiXCircle className="w-3.5 h-3.5" />
          Abort
        </button>
      </div>
    </div>
  );
}

export default AcceptTask;
