/**
 * Payroll Controller
 * Handles payroll processing and retrieval operations
 * Manages employee salary calculations and payroll records
 */

const Payroll = require("../models/Payroll");
const Employee = require("../models/Employee");
const { calculatePayroll } = require("../utils/salaryCalculator");

/**
 * Process payroll for a specific employee
 * @param {Object} req - Express request object containing employee ID and month
 * @param {Object} res - Express response object
 * @returns {Object} Created payroll record
 * 
 * Process:
 * 1. Find employee by ID
 * 2. Calculate salary components
 * 3. Create payroll record
 */
exports.processPayroll = async (req, res) => {
  // Find employee by ID from request parameters
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  // Calculate salary components using the salary calculator utility
  const { grossSalary, taxAmount, netSalary } = calculatePayroll(employee);
  
  // Create new payroll record with calculated values
  const payroll = await Payroll.create({
    employeeId: employee._id,
    month: req.body.month,
    grossSalary,
    bonuses: employee.bonuses,
    deductions: employee.deductions,
    taxRate: employee.taxRate,
    taxAmount,
    netSalary,
    processedDate: new Date()
  });

  res.status(201).json(payroll);
};

/**
 * Get all payroll records
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of all payroll records with populated employee information
 * 
 * Note: Uses populate to include employee details in the response
 */
exports.getPayrolls = async (req, res) => {
  const payrolls = await Payroll.find().populate("employeeId");
  res.json(payrolls);
};
