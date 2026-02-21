const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const auth = (...requireRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      // Check if token is provided
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(token, JWT_SECRET_KEY);
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token!",
        });
      }

      // Check if user's role is permitted
      const { role } = decoded;
      if (requireRoles.length && !requireRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied!",
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      console.error("Auth middleware error:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };
};

module.exports = auth;
