/**
 * Login Page Component
 * Handles admin authentication and login functionality
 * Manages login form state and submission
 */

import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import styles from "./LoginPage.module.css";

/**
 * Login Page Component
 * Provides login form and handles authentication
 * 
 * @returns {JSX.Element} Login form with email and password inputs
 */
function LoginPage() {
  // Form state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Get login function from authentication context
  const { login } = useContext(AuthContext);

  /**
   * Handle form submission
   * Attempts to authenticate user with provided credentials
   * Updates authentication state on success
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Send login request to API
      const res = await API.post("/auth/login", { email, password });
      
      // Update authentication state with received token
      login(res.data.token);
    } catch (err) {
      // Handle login failure
      setError(err.response?.data?.msg || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Cloud Payroll Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={loading}
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            disabled={loading}
          />
          {error && <div className={styles.error}>{error}</div>}
          <button 
            className={styles.button} 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
