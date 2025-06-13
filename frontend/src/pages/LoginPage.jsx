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
 * @returns {JSX.Element} Login form with username and password inputs
 */
function LoginPage() {
  // Form state management
  const [username, setUsername] = useState("");
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
    setLoading(true);
    setError("");
    try {
      // Send login request to API
      const res = await API.post("/auth/login", { username, password });
      
      // Update authentication state with received token
      login(res.data.token);
    } catch (err) {
      // Handle login failure
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginCard}>
        <div className={styles.logoSection}>
          <h2 className={styles.title}>Cloud Payroll Login</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            id="username"
            className={styles.input}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            className={styles.input}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
