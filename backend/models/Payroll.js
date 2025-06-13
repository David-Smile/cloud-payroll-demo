// Import mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

/**
 * Payroll Schema Definition
 * Defines the structure for payroll records in the system
 * Contains salary calculations and payment information for each employee
 */
const PayrollSchema = new mongoose.Schema({
  // Reference to the Employee model using ObjectId
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  
  // Payroll Period Information
  month: String,        // Month for which payroll is processed
  
  // Salary Components
  grossSalary: Number,  // Total salary before deductions
  bonuses: Number,      // Additional bonus amount
  deductions: Number,   // Total deductions amount
  
  // Tax Information
  taxRate: Number,      // Tax rate percentage
  taxAmount: Number,    // Calculated tax amount
  
  // Final Calculations
  netSalary: Number,    // Final salary after all deductions
  
  // Processing Information
  processedDate: Date   // Date when payroll was processed
});

// Create and export the Payroll model based on the schema
module.exports = mongoose.model("Payroll", PayrollSchema);
