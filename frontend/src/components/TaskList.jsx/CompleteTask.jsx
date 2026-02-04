import React from 'react'
import { FiCheckCircle, FiClock, FiTag } from 'react-icons/fi';

const CompleteTask = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between h-full relative overflow-hidden grayscale-[0.5] opacity-80">
      {/* Status Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold uppercase ring-1 ring-emerald-100">
            <FiCheckCircle className="w-3 h-3" />
            Completed
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <FiClock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">{new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <FiTag className="text-emerald-400 w-4 h-4" />
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-tight">{data.category}</p>
        </div>

        <h3 className="text-lg font-extrabold text-gray-900 mb-3 leading-tight">
          {data.title}
        </h3>

        <p className="text-sm text-gray-500 font-medium line-clamp-3">
          {data.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50">
        <div className="w-full py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg text-center">
          Mission Accomplished
        </div>
      </div>
    </div>
  );
}

export default CompleteTask;
