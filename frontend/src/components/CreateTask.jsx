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
    <form onSubmit={handleCreateTask} className="space-y-8">
      {/* Notifications */}
      {successMessage && (
        <div className="bg-emerald-50 border-l-8 border-emerald-500 text-emerald-900 px-6 py-4 rounded-xl flex items-center gap-4 animate-bounce">
          <FiAlertCircle className="w-6 h-6" />
          <p className="font-extrabold text-base">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border-l-8 border-red-500 text-red-900 px-6 py-4 rounded-xl flex items-center gap-4">
          <FiAlertCircle className="w-6 h-6" />
          <p className="font-extrabold text-base">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Task Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-tight">
            Mission Objective / Title
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiFileText className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
            </div>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 text-base font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all placeholder:text-gray-300"
              placeholder="Primary Task Name"
              required
            />
          </div>
        </div>

        {/* Assign To */}
        <div>
          <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-tight">
            Assign Professional
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
            </div>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="block w-full pl-12 pr-10 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 text-base font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
              required
            >
              <option value="">Select Personnel</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} | {emp.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-tight">
            Deadline
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiCalendar className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
            </div>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 text-base font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-tight">
            Department / Category
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiTag className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
            </div>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 text-base font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all placeholder:text-gray-300"
              placeholder="e.g., Engineering"
              required
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-tight">
            Importance Level
          </label>
          <div className="flex gap-4">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPriority(option.value)}
                className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition-all ${priority === option.value
                    ? `${option.color} ring-4 ring-gray-50 scale-105 shadow-md`
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                  }`}
              >
                <FiTarget className={priority === option.value ? 'animate-ping' : ''} />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-tight">
            Mission Briefing (Description)
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows="5"
            className="block w-full p-6 border-2 border-gray-100 rounded-3xl bg-gray-50 text-base font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all placeholder:text-gray-300 resize-none"
            placeholder="Detailed instructions for the assigned personnel..."
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="group relative px-12 py-5 bg-gray-900 hover:bg-black text-white text-lg font-black rounded-2xl shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              Initializing...
            </div>
          ) : (
            <span className="flex items-center gap-3">
              Release Objective
              <FiTarget className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateTask;
