// Import mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

/**
 * Employee Schema Definition
 * Defines the structure for employee records in the payroll system
 * Contains personal, professional, and financial information
 */
const EmployeeSchema = new mongoose.Schema({
  // Personal Information
  firstName: String,    // Employee's first name
  lastName: String,     // Employee's last name
  email: String,        // Employee's email address

  // Professional Information
  position: String,     // Employee's job position
  department: String,   // Department the employee belongs to
  dateHired: Date,      // Date when employee was hired
  isActive: { type: Boolean, default: true },  // Current employment status

  // Financial Information
  baseSalary: Number,   // Employee's base salary
  taxRate: Number,      // Tax rate percentage
  deductions: Number,   // Additional deductions amount
  bonuses: Number       // Additional bonus amount
});

// Create and export the Employee model based on the schema
module.exports = mongoose.model("Employee", EmployeeSchema);
