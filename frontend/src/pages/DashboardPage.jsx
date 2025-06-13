/**
 * Dashboard Page Component
 * Main admin interface for the payroll management system
 * Displays overview cards and latest activity
 */

import { useState, useEffect } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalPayrolls: 0,
    pendingPayrolls: 0,
  });
  const [latestActivity, setLatestActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with actual API endpoints
      const [employeesRes, payrollsRes] = await Promise.all([
        API.get("/employees"),
        API.get("/payroll")
      ]);

      setStats({
        totalEmployees: employeesRes.data.length,
        totalPayrolls: payrollsRes.data.length,
        pendingPayrolls: payrollsRes.data.filter(p => p.status === "pending").length
      });

      // TODO: Replace with actual activity data
      setLatestActivity([
        { id: 1, action: "New employee added", timestamp: new Date().toISOString() },
        { id: 2, action: "Payroll processed", timestamp: new Date().toISOString() }
      ]);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <h1 className={styles.title}>Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <h3>Total Employees</h3>
            <p className={styles.stat}>{stats.totalEmployees}</p>
          </div>
          <div className={styles.card}>
            <h3>Total Payrolls</h3>
            <p className={styles.stat}>{stats.totalPayrolls}</p>
          </div>
          <div className={styles.card}>
            <h3>Pending Payrolls</h3>
            <p className={styles.stat}>{stats.pendingPayrolls}</p>
          </div>
        </div>

        {/* Latest Activity */}
        <div className={styles.activitySection}>
          <h2>Latest Activity</h2>
          <div className={styles.activityList}>
            {loading ? (
              <p>Loading activity...</p>
            ) : latestActivity.length > 0 ? (
              latestActivity.map(activity => (
                <div key={activity.id} className={styles.activityItem}>
                  <span className={styles.action}>{activity.action}</span>
                  <span className={styles.timestamp}>
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p>No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default DashboardPage;
