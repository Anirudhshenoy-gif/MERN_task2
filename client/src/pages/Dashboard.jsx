import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signup');
  };

  const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <div className="auth-container">
      <main className="auth-card dashboard-card">
        <div className="user-badge">{initial}</div>
        <h1 className="auth-title">Welcome!</h1>
        <p className="auth-subtitle">You are successfully authenticated</p>
        
        <p className="dashboard-email" id="user-email-display">
          {user?.email || 'Authenticated User'}
        </p>

        <div className="dashboard-info">
          <p><strong>Account ID:</strong> {user?.id || 'N/A'}</p>
          <p style={{ marginTop: '8px' }}>
            <strong>Session:</strong> Active (JWT stored securely)
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="btn-secondary"
          id="logout-btn"
        >
          Log Out
        </button>
      </main>
    </div>
  );
}
