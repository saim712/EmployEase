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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Logo and Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform transition hover:scale-105">
                            <FiUserPlus className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
                        Join the Team
                    </h2>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                        Employee Registration Portal
                    </p>
                </div>

                {/* Signup Card */}
                <div className="bg-white py-12 px-10 shadow-2xl rounded-3xl border border-gray-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-pulse">
                                <p className="text-sm text-red-700 font-bold">{error}</p>
                            </div>
                        )}
                        {success && (
                            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-lg">
                                <p className="text-sm text-teal-700 font-bold">{success}</p>
                            </div>
                        )}

                        <div className="space-y-5">
                            {/* Full Name */}
                            <div className="relative">
                                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <BsPerson className="h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-600 transition-all text-base"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MdEmail className="h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-600 transition-all text-base"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <RiLockPasswordFill className="h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-600 transition-all text-base"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <RiLockPasswordFill className="h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-600 transition-all text-base"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-black rounded-xl text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all shadow-xl active:scale-[0.98] disabled:bg-teal-400"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Create My Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-10 border-t border-gray-100 pt-8">
                        <div className="mt-2">
                            <Link
                                to="/"
                                className="w-full flex justify-center py-3.5 px-4 border-2 border-teal-600 text-sm font-extrabold rounded-xl text-teal-600 bg-white hover:bg-teal-50 transition-all text-center"
                            >
                                Back to Access
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Empowering Efficient Teams Worldwide
                </p>
            </div>
        </div>
    );
}

export default Signup;
