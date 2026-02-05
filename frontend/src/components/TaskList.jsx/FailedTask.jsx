import React from 'react'
import { FiXCircle, FiClock, FiTag } from 'react-icons/fi';

const FailedTask = ({ data }) => {
  return (
    <div className="group bg-white/60 backdrop-blur-sm rounded-[2rem] border border-slate-100 p-8 flex flex-col justify-between h-full relative overflow-hidden grayscale-[0.6] opacity-90 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-400 to-rose-500"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-rose-50 text-rose-700 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border border-rose-100 shadow-sm">
            <FiXCircle className="w-3.5 h-3.5" />
            Terminated
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-400 rounded-xl border border-slate-100">
            <FiClock className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-wider">{new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mb-4 px-1">
          <div className="w-2 h-2 rounded-full bg-rose-500"></div>
          <p className="text-[11px] font-black text-rose-600 uppercase tracking-widest">{data.category}</p>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-4 leading-[1.2]">
          {data.title}
        </h3>

        <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 mb-8">
          {data.description}
        </p>
      </div>

      <div className="pt-6 border-t border-slate-100 relative z-10">
        <div className="w-full py-4 bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl text-center border border-rose-100 shadow-sm">
          Archived / Incomplete
        </div>
      </div>
    </div>
  );
}

export default FailedTask;
