import React, { useState } from 'react';
 
import { useLocation } from 'wouter';
import { mockAdminUser } from '../../lib/mockData';
import './AdminLogin.css';

export default function AdminLogin() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call with delay
    setTimeout(() => {
      // Simple validation - in real app, this would be an API call
      if (email === 'admin@bookmymandap.com' && password === 'admin123') {
        login(mockAdminUser);
        setLocation('/admin/dashboard');
      } else {
        setError('Invalid email or password. Try: admin@bookmymandap.com / admin123');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">BOOKMYMANDAP ADMIN PORTAL</h1>
          <p className="login-subtitle">Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bookmymandap.com"
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Demo credentials: admin@bookmymandap.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
