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
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Status Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>

      <div>
        <div className="flex justify-between items-start mb-4">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${currentPriorityColor}`}>
            {data.priority || 'medium'}
          </span>
          <div className="flex items-center gap-1.5 text-gray-400">
            <FiClock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">{new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <FiTag className="text-indigo-400 w-4 h-4" />
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-tight">{data.category}</p>
        </div>

        <h3 className="text-lg font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
          {data.title}
        </h3>

        <p className="text-sm text-gray-500 font-medium line-clamp-3 mb-6">
          {data.description}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-50">
        <button
          onClick={handleAcceptTask}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95"
        >
          Begin Mission
        </button>
      </div>
    </div>
  );
}

export default NewTask;
