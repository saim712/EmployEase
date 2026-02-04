import React from 'react'
import { FiXCircle, FiClock, FiTag } from 'react-icons/fi';

const FailedTask = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between h-full relative overflow-hidden grayscale-[0.8] opacity-80">
      {/* Status Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 text-red-700 rounded-lg text-[10px] font-bold uppercase ring-1 ring-red-100">
            <FiXCircle className="w-3 h-3" />
            Failed
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <FiClock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">{new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <FiTag className="text-red-400 w-4 h-4" />
          <p className="text-xs font-bold text-red-600 uppercase tracking-tight">{data.category}</p>
        </div>

        <h3 className="text-lg font-extrabold text-gray-900 mb-3 leading-tight">
          {data.title}
        </h3>

        <p className="text-sm text-gray-500 font-medium line-clamp-3">
          {data.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50">
        <div className="w-full py-2 bg-red-50 text-red-700 text-xs font-bold rounded-lg text-center">
          Termination Recorded
        </div>
      </div>
    </div>
  );
}

export default FailedTask;
