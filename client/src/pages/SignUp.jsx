import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { validateSignup } from '../utils/validators';
import { signup } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear inline error on change
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

    const validationErrors = validateSignup(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await signup({
        email: form.email.trim(),
        password: form.password,
      });

      if (response.data && response.data.success) {
        loginUser(response.data.token, response.data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Sign up error:', err);
      const message =
        err.response?.data?.message ||
        'An unexpected error occurred. Please try again.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <main className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">Sign Up</h1>
          <p className="auth-subtitle">
            Already a member?
            <Link to="/login" className="auth-link" id="login-nav-link">
              Log In
            </Link>
          </p>
        </header>

        {serverError && (
          <div className="alert-box alert-danger" role="alert" id="signup-server-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate id="signup-form">
          <FormInput
            id="signup-email"
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
            id="signup-password"
            name="password"
            type="password"
            label="Password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="btn-primary"
            id="signup-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                <span>Signing up...</span>
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
