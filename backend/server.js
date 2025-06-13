/**
 * Main Server File
 * This file sets up and configures the Express server for the Payroll Management System
 * It handles server initialization, middleware setup, and basic routing
 */

// Import required dependencies
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// Initialize Express application
const app = express();

// Connect to MongoDB database
connectDB();

// Middleware Configuration
app.use(cors());        // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Basic Route - API Health Check
app.get("/", (req, res) => {
  res.send("Payroll Management System API Running...");
});

// TODO: Additional routes will be added here for:
// - Employee management
// - Payroll processing
// - Admin authentication
// - Reports generation

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
