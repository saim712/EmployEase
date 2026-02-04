import React, { useContext } from "react";
import { AuthDataContext } from "../context/AuthContextProvider";
import { FiLogOut, FiUser, FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";

function Header({ data }) {
  const { logout } = useContext(AuthDataContext);

  const handleLogOut = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg shadow-md">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-extrabold text-gray-900 leading-none">
                EmployEase
              </h1>
              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
                Management
              </span>
            </div>
          </Link>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Notification Placeholder */}
            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
              <FiBell className="w-5 h-5" />
            </button>

            {/* Profile Section */}
            <div className="flex items-center space-x-3 pl-2 sm:pl-4 border-l border-gray-100">
              <div className="flex flex-col text-right hidden lg:block">
                <p className="text-sm font-bold text-gray-900">{data}</p>
                <p className="text-[10px] text-gray-500 font-medium">Active Now</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100">
                <FiUser className="w-6 h-6 text-indigo-600" />
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogOut}
              className="ml-2 flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-100 hover:border-red-200 text-sm font-bold rounded-lg transition-all"
            >
              <FiLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
