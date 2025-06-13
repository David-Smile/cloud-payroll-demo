/**
 * API Service Configuration
 * Sets up axios instance for making HTTP requests to the backend
 * Handles authentication token management
 */

import axios from "axios";

// Create axios instance with base configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api",  // Base URL for all API requests
});

/**
 * Request Interceptor
 * Automatically adds authentication token to all requests
 * Retrieves token from localStorage and adds it to request headers
 * 
 * @param {Object} config - Axios request configuration
 * @returns {Object} Modified request configuration with auth token
 */
API.interceptors.request.use((config) => {
  // Get authentication token from localStorage
  const token = localStorage.getItem("token");
  
  // If token exists, add it to request headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default API;
