/**
 * Authentication Context
 * Manages authentication state and provides authentication methods
 * throughout the application using React Context API
 */

import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/user');
          setUser(res.data);
        } catch (err) {
          console.error('Error loading user:', err);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  /**
   * Login function
   * Updates authentication token in state and localStorage
   * 
   * @param {string} newToken - JWT token received from login API
   */
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  /**
   * Logout function
   * Clears authentication token from state and localStorage
   */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  // Provide authentication context to children
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
