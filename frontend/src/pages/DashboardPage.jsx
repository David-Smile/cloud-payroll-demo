/**
 * Dashboard Page Component
 * Main admin interface for the payroll management system
 * Protected route that requires authentication
 */

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Dashboard Page Component
 * Displays the main admin interface and provides logout functionality
 * 
 * @returns {JSX.Element} Dashboard interface with logout option
 */
function DashboardPage() {
  // Get logout function from authentication context
  const { logout } = useContext(AuthContext);

  return (
    <div>
      {/* Dashboard header */}
      <h1>Payroll Admin Dashboard</h1>
      
      {/* Logout button - triggers authentication context logout function */}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
