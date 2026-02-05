import React, { useState, useEffect } from 'react'
import api from '../utils/api'
import { FiUser, FiCalendar, FiTag, FiAlertCircle, FiFileText, FiTarget } from 'react-icons/fi'

function CreateTask({ onTaskCreated }) {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [assignTo, setAssignTo] = useState('')
  const [category, setCategory] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await api.get('/auth/employees');
        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDate || !assignTo || !category || !taskDescription) {
      setErrorMessage('All fields are required');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setLoading(true);
    try {
      await api.post('/tasks', {
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDate,
        assignedTo: assignTo,
        category,
        priority
      });

      setSuccessMessage('Task created successfully!');
      setTaskTitle('');
      setTaskDate('');
      setAssignTo('');
      setCategory('');
      setTaskDescription('');
      setPriority('medium');

      setTimeout(() => setSuccessMessage(''), 3000);

      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to create task');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { value: 'medium', label: 'Medium', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { value: 'high', label: 'High', color: 'text-red-700 bg-red-50 border-red-200' },
  ];

  return (
    <form onSubmit={handleCreateTask} className="space-y-10">
      {/* Notifications */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-900 px-6 py-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <FiCheckSquare className="w-6 h-6" />
          </div>
          <p className="font-bold text-sm tracking-tight">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-100 text-rose-900 px-6 py-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <FiAlertCircle className="w-6 h-6" />
          </div>
          <p className="font-bold text-sm tracking-tight">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {/* Task Title */}
        <div className="md:col-span-2">
          <label className="block text-[11px] font-black text-slate-400 mb-2.5 uppercase tracking-[0.2em] ml-1">
            Task Description / Title
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FiFileText className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="block w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-200"
              placeholder="e.g., Finalize Q4 Financial Report"
              required
            />
          </div>
        </div>

        {/* Assign To */}
        <div>
          <label className="block text-[11px] font-black text-slate-400 mb-2.5 uppercase tracking-[0.2em] ml-1">
            Assign Personnel
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="block w-full pl-14 pr-10 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
              required
            >
              <option value="">Select individual...</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} — {emp.email.split('@')[0]}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-[11px] font-black text-slate-400 mb-2.5 uppercase tracking-[0.2em] ml-1">
            Submission Deadline
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FiCalendar className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="block w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[11px] font-black text-slate-400 mb-2.5 uppercase tracking-[0.2em] ml-1">
            Department / Category
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FiTag className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-200"
              placeholder="e.g., Marketing Operations"
              required
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-[11px] font-black text-slate-400 mb-2.5 uppercase tracking-[0.2em] ml-1">
            Priority Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPriority(option.value)}
                className={`flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl border transition-all duration-200 ${priority === option.value
                  ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10 scale-105 active:scale-100'
                  : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                  }`}
              >
                <FiTarget className={`w-4 h-4 mb-2 ${priority === option.value ? 'animate-pulse' : ''}`} />
                <span className="text-[10px] font-black uppercase tracking-widest">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-[11px] font-black text-slate-400 mb-2.5 uppercase tracking-[0.2em] ml-1">
            Mission Briefing (Instructions)
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows="5"
            className="block w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-200 resize-none"
            placeholder="Provide comprehensive details and objectives for this assignment..."
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={loading}
          className="group relative px-10 py-4.5 bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-base font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <span className="flex items-center gap-3 tracking-tight">
              Deploy Task Objective
              <FiTarget className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateTask;
