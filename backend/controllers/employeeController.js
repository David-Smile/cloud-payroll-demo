/**
 * Employee Controller
 * Handles all employee-related operations
 * Implements CRUD (Create, Read, Update, Delete) functionality for employees
 */

const Employee = require("../models/Employee");

/**
 * Create a new employee
 * @param {Object} req - Express request object containing employee data
 * @param {Object} res - Express response object
 * @returns {Object} Created employee data
 */
exports.addEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
};

/**
 * Get all employees
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of all employees
 */
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

/**
 * Get a single employee by ID
 * @param {Object} req - Express request object containing employee ID in params
 * @param {Object} res - Express response object
 * @returns {Object} Employee data
 */
exports.getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
};

/**
 * Update an employee's information
 * @param {Object} req - Express request object containing employee ID and update data
 * @param {Object} res - Express response object
 * @returns {Object} Updated employee data
 */
exports.updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true }  // Return the updated document
  );
  res.json(employee);
};

/**
 * Delete an employee
 * @param {Object} req - Express request object containing employee ID
 * @param {Object} res - Express response object
 * @returns {Object} Success message
 */
exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};
