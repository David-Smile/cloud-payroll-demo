/**
 * Payroll Routes
 * Defines the API endpoints for payroll management
 * All routes are protected and require authentication
 */

const express = require("express");
const router = express.Router();
const { processPayroll, getPayrolls } = require("../controllers/payrollController");
const protect = require("../middleware/authMiddleware");

// POST /api/payroll/:id
// Process payroll for a specific employee
// Protected route - requires authentication
// Request body: { month: string }
router.post("/:id", protect, processPayroll);

// GET /api/payroll
// Get all payroll records
// Protected route - requires authentication
// Returns payroll records with populated employee information
router.get("/", protect, getPayrolls);

module.exports = router;
