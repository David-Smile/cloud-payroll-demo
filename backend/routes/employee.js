const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * Get all employees
 * @route GET /api/employees
 */
router.get("/", async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * Get employee by ID
 * @route GET /api/employees/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select("-password");
    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router; 