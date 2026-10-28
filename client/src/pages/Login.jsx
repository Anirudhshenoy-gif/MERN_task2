import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { validateLogin } from '../utils/validators';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validateLogin(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await login({
        email: form.email.trim(),
        password: form.password,
      });

      if (response.data && response.data.success) {
        loginUser(response.data.token, response.data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      const message =
        err.response?.data?.message ||
        'Invalid email or password. Please try again.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <main className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">Log In</h1>
          <p className="auth-subtitle">
            Need an account?
            <Link to="/signup" className="auth-link" id="signup-nav-link">
              Sign Up
            </Link>
          </p>
        </header>

        {serverError && (
          <div className="alert-box alert-danger" role="alert" id="login-server-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate id="login-form">
          <FormInput
            id="login-email"
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
            autoComplete="email"
          />

          <FormInput
            id="login-password"
            name="password"
            type="password"
            label="Password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="btn-primary"
            id="login-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                <span>Logging in...</span>
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
