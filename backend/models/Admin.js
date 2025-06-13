// Import mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

/**
 * Admin Schema Definition
 * Defines the structure and validation rules for admin users in the system
 */
const AdminSchema = new mongoose.Schema({
  // Username field - must be unique and required
  username: { type: String, required: true, unique: true },
  // Password hash field - stores the hashed password, required for security
  passwordHash: { type: String, required: true },
  // Role field - defaults to "admin" if not specified
  role: { type: String, default: "admin" }
});

// Create and export the Admin model based on the schema
module.exports = mongoose.model("Admin", AdminSchema);
