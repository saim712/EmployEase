import React, { useContext, useEffect } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import AdminSignup from "./components/Auth/AdminSignup";
import EmployeeDashboard from "./components/Dashboards/EmployeeDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import { AuthDataContext } from "./context/AuthContextProvider";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useContext(AuthDataContext);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  const { user, loading } = useContext(AuthDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'admin') navigate('/admin');
      if (user.role === 'employee') navigate('/employ');
    }
  }, [user, loading]);

  return (
    <>
      <div className="overflow-hidden">
        <Routes>
          <Route path="/" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/employ'} />} />
          <Route element={<Signup />} path="/signup" />
          <Route element={<AdminSignup />} path="/admin-signup" />
          <Route
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
            path="/admin"
          />
          <Route
            element={
              <ProtectedRoute allowedRole="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
            path="/employ"
          />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </div>
    </>
  );
};

export default App;
