const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/authController");
const { auth } = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

/**
 * Register a new user
 * @route POST /api/auth/register
 */
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
  ],
  register
);

/**
 * Login user
 * @route POST /api/auth/login
 */
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  login
);

/**
 * Get current user
 * @route GET /api/auth/user
 */
router.get("/user", auth, getUser);

module.exports = router;
