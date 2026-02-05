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
    <header className="sticky top-0 z-50 w-full glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3.5 hover:opacity-90 transition-all duration-200">
            <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-600/20">
              <span className="text-white font-black text-xl">E</span>
            </div>
            <div className="hidden xs:block">
              <h1 className="text-xl font-black text-slate-900 leading-none tracking-tight">
                EmployEase
              </h1>
              <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-[0.15em] mt-1 block">
                Enterprise
              </span>
            </div>
          </Link>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Notification Placeholder */}
            <button className="relative p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 group">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
            </button>

            {/* Profile Section */}
            <div className="flex items-center gap-3 pl-3 sm:pl-5 border-l border-slate-200">
              <div className="flex flex-col text-right hidden sm:flex">
                <p className="text-xs font-bold text-slate-900 leading-tight">{data}</p>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-slate-100 rounded-2xl border-2 border-white shadow-sm ring-1 ring-slate-100/50 overflow-hidden transform transition hover:rotate-3 duration-200">
                <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-indigo-500" />
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogOut}
              className="flex items-center justify-center p-2.5 sm:px-4 sm:py-2.5 bg-slate-900 hover:bg-rose-600 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-slate-900/10 hover:shadow-rose-600/20 active:scale-95"
            >
              <FiLogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
