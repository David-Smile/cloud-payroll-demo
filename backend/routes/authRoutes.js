/**
 * Authentication Routes
 * Defines the API endpoints for user authentication
 * Handles admin registration and login functionality
 */

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// POST /api/auth/register
// Register a new admin user
// Request body: { username: string, password: string }
router.post("/register", register);

// POST /api/auth/login
// Authenticate admin user and get JWT token
// Request body: { username: string, password: string }
router.post("/login", login);

module.exports = router;
