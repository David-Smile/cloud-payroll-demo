const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate requests using JWT tokens.
 * Checks for a token in the request header and verifies it.
 * If valid, attaches the user information to the request object.
 * If invalid, returns an error response.
 */
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
