import React from 'react';

function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
      <a
        href="/"
        className="px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFound;
