const mongoose = require("mongoose");

/**
 * User Schema
 * Defines the structure for user documents in the database.
 * Each user has a name, email, password, and role.
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
});

module.exports = mongoose.model("User", UserSchema);
