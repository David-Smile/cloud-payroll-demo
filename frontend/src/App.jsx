/**
 * Main Application Component
 * Sets up routing and authentication for the application
 * Manages protected and public routes
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EmployeePage from "./pages/EmployeePage";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

/**
 * Private Route Component
 * Protects routes that require authentication
 * Redirects to login page if user is not authenticated
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be protected
 * @returns {JSX.Element} Protected route or redirect to login
 */
function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

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
    // Wrap entire app with authentication provider
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public route - Login page */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected route - Dashboard */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          {/* Protected route - Employee Management */}
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
