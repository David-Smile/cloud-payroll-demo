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
  try {
    // Add the user who created the employee
    req.body.createdBy = req.user.id;
    
    const employee = await Employee.create(req.body);
    return employee;
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw new Error(Object.values(err.errors).map(val => val.message).join(', '));
    }
    if (err.code === 11000) {
      throw new Error('Email already exists');
    }
    throw err;
  }
};

/**
 * Get all employees
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of all employees
 */
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');
    return employees;
  } catch (err) {
    throw new Error('Error fetching employees');
  }
};

/**
 * Get a single employee by ID
 * @param {Object} req - Express request object containing employee ID in params
 * @param {Object} res - Express response object
 * @returns {Object} Employee data
 */
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('createdBy', 'name email');
    return employee;
  } catch (err) {
    if (err.name === 'CastError') {
      throw new Error('Invalid employee ID');
    }
    throw new Error('Error fetching employee');
  }
};

/**
 * Update an employee's information
 * @param {Object} req - Express request object containing employee ID and update data
 * @param {Object} res - Express response object
 * @returns {Object} Updated employee data
 */
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,
        runValidators: true
      }
    ).populate('createdBy', 'name email');
    
    return employee;
  } catch (err) {
    if (err.name === 'ValidationError') {
      throw new Error(Object.values(err.errors).map(val => val.message).join(', '));
    }
    if (err.name === 'CastError') {
      throw new Error('Invalid employee ID');
    }
    throw new Error('Error updating employee');
  }
};

/**
 * Delete an employee
 * @param {Object} req - Express request object containing employee ID
 * @param {Object} res - Express response object
 * @returns {Object} Success message
 */
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return true;
  } catch (err) {
    if (err.name === 'CastError') {
      throw new Error('Invalid employee ID');
    }
    throw new Error('Error deleting employee');
  }
};
