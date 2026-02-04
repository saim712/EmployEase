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
    <div className="min-h-screen bg-[#fcfcfd]">
      <Header data={user?.name || "Employee"} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome, {user?.name}!
            </h1>
            <p className="mt-1 text-gray-500 font-medium text-base">
              Monitor your current assignments and track your progress.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchTasks}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50 shadow-sm"
            >
              <FiRefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Worklist
            </button>
          </div>
        </div>

        {/* Task Stats Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FiClipboard className="text-indigo-600 w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
          </div>
          <TaskCard tasks={tasks} />
        </section>

        {/* Task List Header & Filters */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <FiList className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Assigned Tasks</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Showing {filteredTasks.length} {filter !== 'all' ? filter : ''} tasks
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label htmlFor="filter" className="text-sm font-bold text-gray-700 hidden lg:block">Filter by:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 sm:flex-none pl-4 pr-10 py-2.5 border-2 border-gray-100 rounded-xl bg-gray-50 text-sm font-bold text-gray-900 hover:bg-indigo-50 hover:border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="all">All Missions</option>
                <option value="new">Unstarted</option>
                <option value="active">In Progress</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Task Content Area */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2 sm:p-6 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-gray-500 font-bold">Synchronizing your dashboard...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <FiClipboard className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Schedule!</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium">
                  {filter === 'all'
                    ? "Great job! You have no tasks assigned at the moment. Take a break."
                    : `No tasks found with importance level: "${filter}".`}
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
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
