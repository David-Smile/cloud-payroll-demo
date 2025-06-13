/**
 * Reports Page Component
 * Provides various reports and analytics for the payroll system:
 * - Payroll summary reports
 * - Tax reports
 * - Monthly salary distribution
 */

import { useState, useEffect } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";
import styles from "./ReportsPage.module.css";

function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [reportData, setReportData] = useState({
    payrollSummary: null,
    taxReport: null,
    salaryDistribution: null
  });

  useEffect(() => {
    fetchReports();
  }, [selectedYear, selectedMonth]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API endpoints
      const [summaryRes, taxRes, distributionRes] = await Promise.all([
        API.get(`/reports/summary?year=${selectedYear}`),
        API.get(`/reports/tax?month=${selectedMonth}`),
        API.get(`/reports/distribution?month=${selectedMonth}`)
      ]);

      setReportData({
        payrollSummary: summaryRes.data,
        taxReport: taxRes.data,
        salaryDistribution: distributionRes.data
      });
      setError("");
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load report data");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async (reportType) => {
    try {
      const response = await API.get(`/reports/${reportType}/download`, {
        responseType: 'blob',
        params: {
          year: selectedYear,
          month: selectedMonth
        }
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}-report-${selectedYear}-${selectedMonth}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading report:", err);
      setError("Failed to download report");
    }
  };

  return (
    <AdminLayout>
      <div className={styles.reportsPage}>
        <h1 className={styles.title}>Reports & Analytics</h1>

        {/* Date Selection */}
        <div className={styles.dateSelection}>
          <div className={styles.dateInput}>
            <label htmlFor="year">Year</label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={styles.select}
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className={styles.dateInput}>
            <label htmlFor="month">Month</label>
            <input
              type="month"
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className={styles.monthInput}
            />
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {loading ? (
          <p>Loading reports...</p>
        ) : (
          <div className={styles.reportsGrid}>
            {/* Payroll Summary Report */}
            <div className={styles.reportCard}>
              <h2>Payroll Summary</h2>
              <div className={styles.reportContent}>
                {reportData.payrollSummary ? (
                  <>
                    <div className={styles.stat}>
                      <span>Total Payroll</span>
                      <strong>${reportData.payrollSummary.totalAmount?.toFixed(2) || '0.00'}</strong>
                    </div>
                    <div className={styles.stat}>
                      <span>Total Employees</span>
                      <strong>{reportData.payrollSummary.totalEmployees || 0}</strong>
                    </div>
                    <div className={styles.stat}>
                      <span>Average Salary</span>
                      <strong>${reportData.payrollSummary.averageSalary?.toFixed(2) || '0.00'}</strong>
                    </div>
                  </>
                ) : (
                  <p>No data available</p>
                )}
              </div>
              <button
                onClick={() => handleDownloadReport('summary')}
                className={styles.downloadButton}
              >
                Download Summary
              </button>
            </div>

            {/* Tax Report */}
            <div className={styles.reportCard}>
              <h2>Tax Report</h2>
              <div className={styles.reportContent}>
                {reportData.taxReport ? (
                  <>
                    <div className={styles.stat}>
                      <span>Total Tax</span>
                      <strong>${reportData.taxReport.totalTax?.toFixed(2) || '0.00'}</strong>
                    </div>
                    <div className={styles.stat}>
                      <span>Income Tax</span>
                      <strong>${reportData.taxReport.incomeTax?.toFixed(2) || '0.00'}</strong>
                    </div>
                    <div className={styles.stat}>
                      <span>Social Security</span>
                      <strong>${reportData.taxReport.socialSecurity?.toFixed(2) || '0.00'}</strong>
                    </div>
                  </>
                ) : (
                  <p>No data available</p>
                )}
              </div>
              <button
                onClick={() => handleDownloadReport('tax')}
                className={styles.downloadButton}
              >
                Download Tax Report
              </button>
            </div>

            {/* Salary Distribution */}
            <div className={styles.reportCard}>
              <h2>Salary Distribution</h2>
              <div className={styles.reportContent}>
                {reportData.salaryDistribution ? (
                  <div className={styles.distribution}>
                    <div className={styles.distributionBar}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${reportData.salaryDistribution.lowRange}%` }}
                      >
                        Low Range
                      </div>
                    </div>
                    <div className={styles.distributionBar}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${reportData.salaryDistribution.midRange}%` }}
                      >
                        Mid Range
                      </div>
                    </div>
                    <div className={styles.distributionBar}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${reportData.salaryDistribution.highRange}%` }}
                      >
                        High Range
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No data available</p>
                )}
              </div>
              <button
                onClick={() => handleDownloadReport('distribution')}
                className={styles.downloadButton}
              >
                Download Distribution
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default ReportsPage; 