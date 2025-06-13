/**
 * Payroll Page Component
 * Handles payroll management functionality including:
 * - Viewing payroll history
 * - Creating new payroll
 * - Downloading payslips
 */

import { useState, useEffect } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";
import styles from "./PayrollPage.module.css";

function PayrollPage() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await API.get("/payroll");
      setPayrolls(response.data);
    } catch (err) {
      console.error("Error fetching payrolls:", err);
      setError("Failed to load payroll data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayroll = async () => {
    try {
      setLoading(true);
      await API.post("/payroll", { month: selectedMonth });
      await fetchPayrolls();
      setError("");
    } catch (err) {
      console.error("Error creating payroll:", err);
      setError("Failed to create payroll");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPayslip = async (payrollId) => {
    try {
      const response = await API.get(`/payroll/${payrollId}/payslip`, {
        responseType: 'blob'
      });
      
      // Create a blob from the PDF data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `payslip-${payrollId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading payslip:", err);
      setError("Failed to download payslip");
    }
  };

  return (
    <AdminLayout>
      <div className={styles.payrollPage}>
        <h1 className={styles.title}>Payroll Management</h1>

        {/* Create New Payroll Section */}
        <div className={styles.createSection}>
          <h2>Create New Payroll</h2>
          <div className={styles.createForm}>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className={styles.monthInput}
            />
            <button
              onClick={handleCreatePayroll}
              disabled={loading}
              className={styles.createButton}
            >
              {loading ? "Creating..." : "Create Payroll"}
            </button>
          </div>
        </div>

        {/* Payroll History Section */}
        <div className={styles.historySection}>
          <h2>Payroll History</h2>
          {error && <div className={styles.error}>{error}</div>}
          
          {loading ? (
            <p>Loading payroll data...</p>
          ) : payrolls.length > 0 ? (
            <div className={styles.payrollList}>
              <table className={styles.payrollTable}>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Status</th>
                    <th>Total Amount</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.map((payroll) => (
                    <tr key={payroll._id}>
                      <td>{new Date(payroll.month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</td>
                      <td>
                        <span className={`${styles.status} ${styles[payroll.status]}`}>
                          {payroll.status}
                        </span>
                      </td>
                      <td>${payroll.totalAmount?.toFixed(2) || '0.00'}</td>
                      <td>{new Date(payroll.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => handleDownloadPayslip(payroll._id)}
                          className={styles.downloadButton}
                        >
                          Download Payslip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No payroll records found</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default PayrollPage; 