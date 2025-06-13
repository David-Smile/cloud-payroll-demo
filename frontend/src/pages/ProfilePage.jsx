/**
 * Profile Page Component
 * Handles user profile management including:
 * - Personal information
 * - Security settings
 * - Notification preferences
 */

import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";
import { AuthContext } from "../context/AuthContext";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const { user, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: {
      email: true,
      payroll: true,
      updates: false
    }
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        notifications: user.notifications || {
          email: true,
          payroll: true,
          updates: false
        }
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notification.')) {
      const notificationType = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationType]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await API.put("/users/profile", {
        name: formData.name,
        email: formData.email,
        notifications: formData.notifications
      });

      updateUser(response.data);
      setSuccess("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await API.put("/users/password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      setSuccess("Password updated successfully");
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } catch (err) {
      console.error("Error updating password:", err);
      setError(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.profilePage}>
        <h1 className={styles.title}>Profile Settings</h1>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.profileGrid}>
          {/* Personal Information */}
          <div className={styles.profileCard}>
            <h2>Personal Information</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>

          {/* Security Settings */}
          <div className={styles.profileCard}>
            <h2>Security Settings</h2>
            <form onSubmit={handlePasswordChange}>
              <div className={styles.formGroup}>
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className={styles.profileCard}>
            <h2>Notification Preferences</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="notification.email"
                    checked={formData.notifications.email}
                    onChange={handleInputChange}
                  />
                  Email Notifications
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="notification.payroll"
                    checked={formData.notifications.payroll}
                    onChange={handleInputChange}
                  />
                  Payroll Updates
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="notification.updates"
                    checked={formData.notifications.updates}
                    onChange={handleInputChange}
                  />
                  System Updates
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? "Updating..." : "Save Preferences"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ProfilePage; 