import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'employee' // Default role
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    { id: 'employee', label: 'Employee', icon: '👤', color: '#4a90e2' },
    { id: 'admin', label: 'Admin', icon: '👨‍💼', color: '#2ecc71' },
    { id: 'hr', label: 'HR', icon: '👥', color: '#e74c3c' },
    { id: 'manager', label: 'Manager', icon: '👨‍💻', color: '#9b59b6' },
    { id: 'finance', label: 'Finance', icon: '💰', color: '#f1c40f' }
  ];

  // Handle error display and auto-hide
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setTimeout(() => {
          setError('');
        }, 300); // Wait for fade out animation to complete
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (roleId) => {
    setFormData({
      ...formData,
      role: roleId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await API.post('/auth/login', formData);
      login(response.data.token);

      // Redirect based on selected role
      switch (formData.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'hr':
          navigate('/hr/dashboard');
          break;
        case 'manager':
          navigate('/manager/dashboard');
          break;
        case 'finance':
          navigate('/finance/dashboard');
          break;
        default:
          navigate('/employee/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      {showError && (
        <div className={styles.errorToast}>
          <div className={styles.errorContent}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        </div>
      )}
      
      <div className={styles.loginContainer}>
        <h1>Welcome Back</h1>
        <p>Please sign in to continue</p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="role">Select Your Role</label>
            <div className={styles.roleSelector}>
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  className={`${styles.roleButton} ${formData.role === role.id ? styles.active : ''}`}
                  onClick={() => handleRoleSelect(role.id)}
                  style={{
                    '--role-color': role.color,
                    borderColor: formData.role === role.id ? role.color : '#ddd'
                  }}
                >
                  <span className={styles.roleIcon}>{role.icon}</span>
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className={styles.input}
              />
              <span className={styles.inputIcon}>✉️</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
            style={{
              backgroundColor: roles.find(r => r.id === formData.role)?.color || '#4a90e2'
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 