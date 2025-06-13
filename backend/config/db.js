// Import mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

/**
 * Database connection function
 * Establishes connection to MongoDB using the URI from environment variables
 * Exits the process if connection fails
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    // Log error and exit process if connection fails
    console.error(err.message);
    process.exit(1);
  }
};

// Export the database connection function
module.exports = connectDB;
