/**
 * Authentication Controller
 * Handles admin registration and login functionality
 * Manages password hashing and JWT token generation
 */

const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Register a new admin user
 * @param {Object} req - Express request object containing username and password
 * @param {Object} res - Express response object
 * 
 * Process:
 * 1. Check if admin already exists
 * 2. Hash the password
 * 3. Create new admin user
 */
exports.register = async (req, res) => {
  const { username, password } = req.body;
  
  // Check if admin with username already exists
  const adminExists = await Admin.findOne({ username });
  if (adminExists) return res.status(400).json({ message: "Admin already exists" });

  // Hash password with bcrypt (10 rounds of salting)
  const passwordHash = await bcrypt.hash(password, 10);
  
  // Create new admin user
  const admin = await Admin.create({ username, passwordHash });

  res.status(201).json({ message: "Admin created" });
};

/**
 * Login admin user
 * @param {Object} req - Express request object containing username and password
 * @param {Object} res - Express response object
 * 
 * Process:
 * 1. Find admin by username
 * 2. Verify password
 * 3. Generate JWT token
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  // Find admin by username
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: "Invalid credentials" });

  // Compare provided password with hashed password
  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT token with 1 day expiration
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({ token });
};
