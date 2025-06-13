import React, { useState, useEffect } from 'react';
import styles from './EmployeeDashboard.module.css';

const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    position: '',
    department: '',
    salary: 0,
    nextPayday: '',
    leaveBalance: 0
  });

  const [recentPayslips, setRecentPayslips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch employee dashboard data
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/employee/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (response.ok) {
          setEmployeeData(data.employeeData);
          setRecentPayslips(data.recentPayslips);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.welcomeSection}>
          <h1>Welcome, {employeeData.name}</h1>
          <p>{employeeData.position} • {employeeData.department}</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statInfo}>
            <h3>Current Salary</h3>
            <p className={styles.statValue}>${employeeData.salary.toLocaleString()}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statInfo}>
            <h3>Next Payday</h3>
            <p className={styles.statValue}>{new Date(employeeData.nextPayday).toLocaleDateString()}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏖️</div>
          <div className={styles.statInfo}>
            <h3>Leave Balance</h3>
            <p className={styles.statValue}>{employeeData.leaveBalance} days</p>
          </div>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.payslips}>
          <h2>Recent Payslips</h2>
          <div className={styles.payslipList}>
            {recentPayslips.map((payslip, index) => (
              <div key={index} className={styles.payslipItem}>
                <div className={styles.payslipInfo}>
                  <h3>{payslip.month}</h3>
                  <p className={styles.payslipDate}>{new Date(payslip.date).toLocaleDateString()}</p>
                </div>
                <div className={styles.payslipAmount}>
                  <p>${payslip.amount.toLocaleString()}</p>
                  <button className={styles.downloadButton}>
                    <span className={styles.buttonIcon}>⬇️</span>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionButtons}>
            <button className={styles.actionButton}>
              <span className={styles.buttonIcon}>📝</span>
              Request Leave
            </button>
            <button className={styles.actionButton}>
              <span className={styles.buttonIcon}>📊</span>
              View Reports
            </button>
            <button className={styles.actionButton}>
              <span className={styles.buttonIcon}>👤</span>
              Update Profile
            </button>
            <button className={styles.actionButton}>
              <span className={styles.buttonIcon}>🔔</span>
              Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard; 