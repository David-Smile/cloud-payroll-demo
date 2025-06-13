/**
 * Main Application Component
 * Sets up routing and authentication for the application
 * Manages protected and public routes
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';
import LoginPage from './components/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import Employees from './pages/admin/Employees';
import Payroll from './pages/admin/Payroll';
import Reports from './pages/admin/Reports';
import Profile from './pages/admin/Profile';

/**
 * App Component
 * Main application wrapper that provides:
 * - Authentication context
 * - Routing configuration
 * - Protected and public routes
 * 
 * @returns {JSX.Element} Application with routing and authentication
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
