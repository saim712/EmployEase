import React, { useState } from 'react';
import { BsPerson } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useNavigate, Link } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import api from '../../utils/api';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (password.length < 4) {
            setError("Password must be at least 4 characters long");
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/register', {
                name,
                email,
                password,
                role: 'employee'
            });

            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            console.error("Signup error:", err);
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="max-w-md w-full px-6 relative z-10">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-14 w-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform transition hover:scale-105 active:scale-95 duration-200">
                            <FiUserPlus className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Create Account
                    </h2>
                    <p className="text-slate-500 font-medium text-sm mt-1">
                        Join the EmployEase professional network
                    </p>
                </div>

                {/* Signup Card */}
                <div className="bg-white/80 backdrop-blur-xl p-8 shadow-2xl rounded-3xl border border-white/50">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                <p className="text-xs text-rose-600 font-semibold">{error}</p>
                            </div>
                        )}
                        {success && (
                            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                <p className="text-xs text-emerald-600 font-semibold">{success}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <BsPerson className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm"
                                        placeholder="Alex Johnson"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MdEmail className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm"
                                        placeholder="alex@company.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <RiLockPasswordFill className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">
                                        Confirm
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <RiLockPasswordFill className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-emerald-400 disabled:shadow-none"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Create My Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Already have an account?
                        </p>
                        <Link
                            to="/"
                            className="mt-3 inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                            Sign in to Access
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Empowering Efficient Teams Worldwide
                </p>
            </div>
        </div>
    );
}

export default Signup;
