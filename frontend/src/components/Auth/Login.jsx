import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthDataContext } from '../../context/AuthContextProvider';
import { MdEmail, MdLock } from 'react-icons/md';
import { FiLogIn } from 'react-icons/fi';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthDataContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await login(email, password);

            if (user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/employee-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Logo and Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform transition hover:scale-105">
                            <FiLogIn className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
                        EmployEase
                    </h2>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                        Corporate Task Management
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white py-12 px-10 shadow-2xl rounded-3xl border border-gray-100">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-pulse">
                                <p className="text-sm text-red-700 font-bold">{error}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Email Input */}
                            <div className="relative">
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MdEmail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-base"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MdLock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-base"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-black rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all shadow-xl active:scale-[0.98] disabled:bg-indigo-400"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Sign in to Dashboard'
                            )}
                        </button>
                    </form>

                    <div className="mt-10 border-t border-gray-100 pt-8">
                        <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-tighter mb-6">
                            New to the platform?
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                            <Link
                                to="/signup"
                                className="w-full flex justify-center py-3.5 px-4 border-2 border-indigo-600 text-sm font-extrabold rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 transition-all text-center"
                            >
                                Create Employee Account
                            </Link>
                            <Link
                                to="/admin-signup"
                                className="w-full flex justify-center py-2 px-4 text-xs font-bold text-gray-400 hover:text-indigo-600 transition-all text-center"
                            >
                                Are you an Admin? Register here
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Powered by EmployEase Enterprise
                </p>
            </div>
        </div>
    );
}

export default Login;
