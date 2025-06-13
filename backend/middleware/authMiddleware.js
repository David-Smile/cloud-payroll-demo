/**
 * Authentication Middleware
 * This middleware protects routes by verifying JWT tokens
 * Ensures that only authenticated users can access protected routes
 */

const jwt = require("jsonwebtoken");

/**
 * Route Protection Middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * 
 * Verifies JWT token from Authorization header
 * Attaches decoded admin information to request object
 */
const protect = (req, res, next) => {
  // Get token from Authorization header
  let token = req.headers.authorization;

  // Check if token exists
  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    // Remove 'Bearer ' prefix from token
    token = token.split(" ")[1]; // "Bearer token"
    
    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded admin information to request object
    req.admin = decoded;
    
    // Proceed to next middleware/route handler
    next();
  } catch (err) {
    // Handle invalid token
    res.status(401).json({ message: "Invalid token" });
  }
};

// Export the protection middleware
module.exports = protect;