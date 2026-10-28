import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './styles/signup.css';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-container" style={{ textAlign: 'center' }}>
        <div className="spinner" style={{ margin: 'auto', borderTopColor: '#0284c7' }}></div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

// Public route that redirects to dashboard if already logged in
const PublicRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
