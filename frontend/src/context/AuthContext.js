/**
 * Authentication Context
 * Manages authentication state and provides authentication methods
 * throughout the application using React Context API
 */

import { createContext, useState } from "react";

// Create authentication context
export const AuthContext = createContext();

/**
 * Authentication Provider Component
 * Wraps the application to provide authentication state and methods
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Provider component with authentication context
 */
export const AuthProvider = ({ children }) => {
  // Initialize token state from localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  /**
   * Login function
   * Updates authentication token in state and localStorage
   * 
   * @param {string} newToken - JWT token received from login API
   */
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  /**
   * Logout function
   * Clears authentication token from state and localStorage
   */
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Provide authentication context to children
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
