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
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="max-w-md w-full px-6 relative z-10">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-14 w-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg transform transition hover:scale-105 active:scale-95 duration-200">
                            <FiLogIn className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Welcome Back
                    </h2>
                    <p className="text-slate-500 font-medium text-sm mt-1">
                        Sign in to your EmployEase account
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white/80 backdrop-blur-xl p-8 shadow-2xl rounded-3xl border border-white/50">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                <p className="text-xs text-rose-600 font-semibold">{error}</p>
                            </div>
                        )}

                        <div className="space-y-5">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MdEmail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-200 text-sm"
                                        placeholder="admin@employease.com"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Password
                                    </label>
                                    <a href="#" className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider">Forgot?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MdLock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-200 text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-indigo-400 disabled:shadow-none disabled:hover:translate-y-0"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Sign in to Dashboard'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Don't have an account?
                        </p>
                        <div className="mt-3 flex flex-col gap-2">
                            <Link
                                to="/signup"
                                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Join as an Employee
                            </Link>
                            <Link
                                to="/admin-signup"
                                className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                Register as Administrator
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    &copy; 2024 EmployEase &bull; Secure Enterprise Portal
                </p>
            </div>
        </div>
    );
}

export default Login;
