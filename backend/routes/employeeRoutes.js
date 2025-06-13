/**
 * Employee Routes
 * Defines the API endpoints for employee management
 * All routes are protected and require authentication
 */

const express = require("express");
const router = express.Router();
const { addEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const protect = require("../middleware/authMiddleware");

// POST /api/employees - Create a new employee
router.post("/", protect, async (req, res) => {
  try {
    const employee = await addEmployee(req, res);
    res.status(201).json(employee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ 
      message: "Error creating employee",
      error: err.message 
    });
  }
});

// GET /api/employees - Get all employees
router.get("/", protect, async (req, res) => {
  try {
    const employees = await getEmployees(req, res);
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ 
      message: "Error fetching employees",
      error: err.message 
    });
  }
});

// GET /api/employees/:id - Get a single employee
router.get("/:id", protect, async (req, res) => {
  try {
    const employee = await getEmployee(req, res);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ 
      message: "Error fetching employee",
      error: err.message 
    });
  }
});

// PUT /api/employees/:id - Update an employee
router.put("/:id", protect, async (req, res) => {
  try {
    const employee = await updateEmployee(req, res);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ 
      message: "Error updating employee",
      error: err.message 
    });
  }
});

// DELETE /api/employees/:id - Delete an employee
router.delete("/:id", protect, async (req, res) => {
  try {
    await deleteEmployee(req, res);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ 
      message: "Error deleting employee",
      error: err.message 
    });
  }
});

module.exports = router;
