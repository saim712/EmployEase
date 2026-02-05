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
    <div className="min-h-screen bg-slate-50/30">
      <Header data={user?.name || "Admin"} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
              Admin Console
            </h1>
            <p className="text-slate-500 font-medium text-base sm:text-lg">
              Manage your team and operations with precision.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-5 py-3 glass rounded-2xl border border-white/50 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-sm font-bold text-slate-900 tracking-tight">All Operations Normal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-12 inline-flex p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl border border-slate-200/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2.5 py-3 px-6 sm:px-8 rounded-xl text-sm font-bold transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-white text-indigo-600 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200/50'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indigo-600' : ''}`} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Stats Summary Cards */}
                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col group hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-2xl group-hover:scale-110 transition-transform duration-300">
                      <FiCheckSquare />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workflow</p>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">Assignment Engine</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium mb-8 flex-grow leading-relaxed">Instantly delegate high-priority missions to specific department members.</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl text-sm font-bold transition-all duration-200 shadow-lg shadow-slate-900/10 active:scale-95"
                  >
                    Launch Task Creator
                  </button>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col group hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl text-2xl group-hover:scale-110 transition-transform duration-300">
                      <FiUsers />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Directory</p>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">Human Capital</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium mb-8 flex-grow leading-relaxed">Review organizational performance metrics and manage active human resources.</p>
                  <button
                    onClick={() => setActiveTab('employees')}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-95"
                  >
                    Access Management
                  </button>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col group hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl text-2xl group-hover:scale-110 transition-transform duration-300">
                      <FiBarChart2 />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analytics</p>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">Insight Engine</h3>
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium mb-8 flex-grow leading-relaxed">Monitor mission completion rates and identify operational bottlenecks in real-time.</p>
                  <button
                    onClick={() => setActiveTab('employees')}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-sm font-bold transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    View Analytics
                  </button>
                </div>
              </div>

              <div className="glass p-12 rounded-[3rem] border border-white/50 text-center py-24 shadow-xl shadow-slate-200/30">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100">
                  <FiBarChart2 className="w-10 h-10 text-indigo-500/30" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Command Center Ready</h2>
                <p className="max-w-lg mx-auto text-slate-500 font-medium text-lg leading-relaxed mb-8">Deploy resources, monitor team velocity, and optimize organizational workflow from your secure administrative dashboard.</p>
                <div className="flex justify-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-14 animate-in slide-in-from-bottom-8 duration-700">
              <div className="mb-12 border-b border-slate-100 pb-10">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Deploy Mission</h2>
                </div>
                <p className="text-slate-500 font-medium text-lg">Specify parameters to assign a secure task to your organizational personnel.</p>
              </div>
              <CreateTask onTaskCreated={handleTaskCreated} />
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 animate-in slide-in-from-bottom-8 duration-700">
              <div className="mb-10 border-b border-slate-100 pb-10">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Enterprise Human Capital</h2>
                </div>
                <p className="text-slate-500 font-medium text-lg">Deep-level analytics and performance monitoring across all active personnel.</p>
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
