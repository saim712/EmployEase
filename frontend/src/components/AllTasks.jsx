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
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky top-0 z-10 px-6 py-4 bg-gray-50 border-b border-gray-200 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Team Member
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 bg-gray-50 border-b border-gray-200 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                New
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 bg-gray-50 border-b border-gray-200 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Active
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 bg-gray-50 border-b border-gray-200 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Completed
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 bg-gray-50 border-b border-gray-200 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Failed
              </th>
              <th className="sticky top-0 z-10 px-6 py-4 bg-gray-50 border-b border-gray-200 text-right text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Overall Rate
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <FiUsers className="w-10 h-10 text-gray-200 mb-4" />
                    <p className="text-gray-400 font-bold">No registered employees found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((emp, idx) => {
                const total = emp.counts.new + emp.counts.active + emp.counts.completed + emp.counts.failed;
                const completionRate = total > 0 ? Math.round((emp.counts.completed / total) * 100) : 0;

                return (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-gray-900">{emp.name}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                        {emp.counts.new}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                        {emp.counts.active}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                        {emp.counts.completed}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 ring-1 ring-red-100">
                        {emp.counts.failed}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <div className="flex flex-col items-end">
                        <span className={`text-sm font-extrabold ${completionRate > 70 ? 'text-emerald-600' : completionRate > 30 ? 'text-amber-500' : 'text-gray-400'}`}>
                          {completionRate}%
                        </span>
                        <div className="w-20 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${completionRate > 70 ? 'bg-emerald-500' : completionRate > 30 ? 'bg-amber-500' : 'bg-gray-300'}`}
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
