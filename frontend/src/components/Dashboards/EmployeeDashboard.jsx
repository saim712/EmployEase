import React, { useState, useEffect, useContext } from "react";
import Header from "../Header";
import TaskCard from "../TaskList.jsx/TaskCard";
import TaskList from "../TaskList.jsx/TaskList";
import { AuthDataContext } from "../../context/AuthContextProvider";
import api from "../../utils/api";
import { FiFilter, FiRefreshCw, FiClipboard, FiList } from "react-icons/fi";

function EmployeeDashboard() {
  const { user } = useContext(AuthDataContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/tasks');
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter(task => task.status === filter);

  return (
    <div className="min-h-screen bg-slate-50/30">
      <Header data={user?.name || "Employee"} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
              Hello, {user?.name.split(' ')[0]}!
            </h1>
            <p className="text-slate-500 font-medium text-base sm:text-lg">
              Here's what's on your agenda for today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchTasks}
              disabled={loading}
              className="flex items-center gap-2.5 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 text-sm font-bold rounded-2xl border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 disabled:opacity-50"
            >
              <FiRefreshCw className={`h-4 w-4 text-indigo-500 ${loading ? 'animate-spin' : ''}`} />
              Sync Dashboard
            </button>
          </div>
        </div>

        {/* Task Stats Section */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Performance Summary</h2>
          </div>
          <TaskCard tasks={tasks} />
        </section>

        {/* Task List Header & Filters */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 glass p-6 sm:p-8 rounded-[2rem] border border-white/50 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20">
                <FiList className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Assignments</h3>
                <p className="text-sm text-slate-500 font-semibold mt-0.5">
                  Displaying {filteredTasks.length} {filter !== 'all' ? filter : 'total'} assignments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <label htmlFor="filter" className="text-xs font-black text-slate-400 uppercase tracking-widest hidden lg:block">Sort by Status</label>
              <div className="relative flex-1 sm:flex-none">
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full sm:w-48 pl-5 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="all">All Assignments</option>
                  <option value="new">Pending Review</option>
                  <option value="active">In Progress</option>
                  <option value="completed">Finalized</option>
                  <option value="failed">Attention Required</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <FiFilter className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Task Content Area */}
          <div className="min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="relative">
                  <div className="w-14 h-14 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <p className="mt-6 text-slate-500 font-bold text-sm uppercase tracking-widest">Updating Secure Database...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-24 px-6 bg-white/50 rounded-[2rem] border border-slate-100/50">
                <div className="mx-auto w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 border border-white shadow-inner">
                  <FiClipboard className="w-12 h-12 text-slate-200" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">All Caught Up!</h3>
                <p className="text-slate-500 max-w-sm mx-auto font-medium text-base">
                  {filter === 'all'
                    ? "Great progress. There are no new tasks assigned to your profile at this moment."
                    : `No records found under the status focus: "${filter}".`}
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <TaskList tasks={filteredTasks} />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default EmployeeDashboard;
