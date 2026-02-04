import React, { useState, useContext } from "react";
import Header from "../Header";
import CreateTask from "../CreateTask";
import AllTasks from "../AllTasks";
import { AuthDataContext } from "../../context/AuthContextProvider";
import { FiUsers, FiCheckSquare, FiPlus, FiBarChart2, FiGrid } from "react-icons/fi";

function AdminDashboard() {
  const { user } = useContext(AuthDataContext);
  const [taskRefresh, setTaskRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const handleTaskCreated = () => {
    setTaskRefresh(prev => prev + 1);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FiGrid },
    { id: 'create', name: 'Create Task', icon: FiPlus },
    { id: 'employees', name: 'Management', icon: FiUsers },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <Header data={user?.name || "Admin"} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Admin Console
            </h1>
            <p className="mt-1 text-gray-500 font-medium">
              Manage your team and monitor productivity from one place.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="text-xs font-bold text-indigo-600 uppercase">Current Date</p>
              <p className="text-sm font-bold text-indigo-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-10 inline-flex p-1 bg-gray-100 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 py-2.5 px-6 rounded-lg text-sm font-bold transition-all
                  ${activeTab === tab.id
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Summary Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-xl">
                      <FiCheckSquare />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Tool</p>
                      <h3 className="text-xl font-bold text-gray-900">Task Tracker</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Create and assign new tasks to your team members instantly.</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-bold transition-all"
                  >
                    Go to Creation
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">
                      <FiUsers />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Directory</p>
                      <h3 className="text-xl font-bold text-gray-900">Team View</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Review performance statistics and manage employee accounts.</p>
                  <button
                    onClick={() => setActiveTab('employees')}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-all"
                  >
                    View Employees
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl text-xl">
                      <FiBarChart2 />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Metrics</p>
                      <h3 className="text-xl font-bold text-gray-900">Efficiency</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Monitor overall project completion rates and bottlenecks.</p>
                  <button
                    onClick={() => setActiveTab('employees')}
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-bold transition-all"
                  >
                    Check Report
                  </button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <FiBarChart2 className="w-8 h-8 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h2>
                <p className="max-w-md text-gray-500 mt-2 font-medium">Select a tab above to manage your operations or view deep analytics on team performance.</p>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 animate-in slide-in-from-bottom-5 duration-500">
              <div className="mb-8 border-b border-gray-100 pb-8">
                <h2 className="text-2xl font-extrabold text-gray-900">Create New Task</h2>
                <p className="text-gray-500 font-medium">Fill in the details below to assign a new mission to a team member.</p>
              </div>
              <CreateTask onTaskCreated={handleTaskCreated} />
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 animate-in slide-in-from-bottom-5 duration-500">
              <div className="mb-8 border-b border-gray-100 pb-8">
                <h2 className="text-2xl font-extrabold text-gray-900">Team Management</h2>
                <p className="text-gray-500 font-medium">Real-time statistics on employee performance and task assignments.</p>
              </div>
              <div className="overflow-hidden">
                <AllTasks key={taskRefresh} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
