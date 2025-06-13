/**
 * Employee Routes
 * Defines the API endpoints for employee management
 * All routes are protected and require authentication
 */

const express = require("express");
const router = express.Router();
const { addEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const protect = require("../middleware/authMiddleware");

// POST /api/employees
// Create a new employee
// Protected route - requires authentication
router.post("/", protect, addEmployee);

// GET /api/employees
// Get all employees
// Protected route - requires authentication
router.get("/", protect, getEmployees);

// GET /api/employees/:id
// Get a single employee by ID
// Protected route - requires authentication
router.get("/:id", protect, getEmployee);

// PUT /api/employees/:id
// Update an employee's information
// Protected route - requires authentication
router.put("/:id", protect, updateEmployee);

// DELETE /api/employees/:id
// Delete an employee
// Protected route - requires authentication
router.delete("/:id", protect, deleteEmployee);

module.exports = router;
