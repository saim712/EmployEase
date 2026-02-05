import React, { useState, useEffect } from "react";
import api from '../utils/api';
import { FiUsers, FiAward, FiAlertCircle, FiBarChart } from "react-icons/fi";

function AllTasks() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/tasks/employee-stats');
        setEmployees(data.stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-bold">Fetching team analytics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Administrative Member
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Pending
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Active
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Completed
              </th>
              <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Failed
              </th>
              <th className="px-6 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Efficiency Core
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-24 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                      <FiUsers className="w-8 h-8 text-slate-200" />
                    </div>
                    <p className="text-slate-400 font-bold text-sm tracking-tight">No active personnel records found in database.</p>
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((emp, idx) => {
                const total = emp.counts.new + emp.counts.active + emp.counts.completed + emp.counts.failed;
                const completionRate = total > 0 ? Math.round((emp.counts.completed / total) * 100) : 0;

                return (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-all duration-200">
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-gradient-to-br from-indigo-50 to-indigo-100/50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm border border-indigo-100 group-hover:scale-110 transition-transform duration-200">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 tracking-tight">{emp.name}</p>
                          <p className="text-[11px] text-slate-400 font-bold tracking-tight lowercase">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        <span className="text-sm font-black text-slate-600">{emp.counts.new}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                        <span className="text-sm font-black text-slate-900">{emp.counts.active}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-black text-slate-900">{emp.counts.completed}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                        <span className="text-sm font-black text-slate-900">{emp.counts.failed}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap text-right">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-2">
                          <FiBarChart className={`w-3 h-3 ${completionRate > 70 ? 'text-emerald-500' : completionRate > 30 ? 'text-amber-500' : 'text-slate-300'}`} />
                          <span className={`text-xs font-black tracking-tighter ${completionRate > 70 ? 'text-emerald-600' : completionRate > 30 ? 'text-amber-600' : 'text-slate-400'}`}>
                            {completionRate}% Efficiency
                          </span>
                        </div>
                        <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${completionRate > 70 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : completionRate > 30 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-slate-300'}`}
                            style={{ width: `${completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllTasks;
