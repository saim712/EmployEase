import React, { useState } from 'react';
import { BsPerson } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useNavigate, Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import api from '../../utils/api';

function AdminSignup() {
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

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/register', {
                name,
                email,
                password,
                role: 'admin'
            });

            setSuccess("Admin account created successfully! Redirecting to login...");
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            console.error("Admin Signup error:", err);
            setError(err.response?.data?.message || "Admin registration failed. Please try again.");
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
                        <div className="h-16 w-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg transform transition hover:scale-105">
                            <FiShield className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
                        Admin Console
                    </h2>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                        System Administrator Registration
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
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                                <p className="text-sm text-green-700 font-bold">{success}</p>
                            </div>
                        )}

                        <div className="space-y-5">
                            {/* Full Name */}
                            <div className="relative">
                                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                                    Administrative Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <BsPerson className="h-5 w-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-600 transition-all text-base"
                                        placeholder="Admin Contact Name"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                    Official Admin Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MdEmail className="h-5 w-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-600 transition-all text-base"
                                        placeholder="admin@enterprise.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                                    Security Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <RiLockPasswordFill className="h-5 w-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-600 transition-all text-base"
                                        placeholder="Minimum 6 chars"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                                    Confirm Credentials
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <RiLockPasswordFill className="h-5 w-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-600 transition-all text-base"
                                        placeholder="Re-type password"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-black rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all shadow-xl active:scale-[0.98] disabled:bg-red-400"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Activate Admin Status'
                            )}
                        </button>
                    </form>

                    <div className="mt-10 border-t border-gray-100 pt-8">
                        <div className="mt-2 text-center">
                            <Link
                                to="/"
                                className="inline-flex items-center text-sm font-extrabold text-red-600 hover:text-red-700 transition-colors"
                            >
                                Registered? Return to Gate
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Restricted Enterprise Access Only
                </p>
            </div>
        </div>
    );
}

export default AdminSignup;
