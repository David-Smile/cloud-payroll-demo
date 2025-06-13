/**
 * Login Page Component
 * Handles admin authentication and login functionality
 * Manages login form state and submission
 */

import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

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
    try {
      // Send login request to API
      const res = await API.post("/auth/login", { username, password });
      
      // Update authentication state with received token
      login(res.data.token);
    } catch (err) {
      // Handle login failure
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Username input field */}
        <input 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        
        {/* Password input field */}
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
