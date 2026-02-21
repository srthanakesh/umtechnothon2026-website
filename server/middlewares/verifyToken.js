const jwt = require("jsonwebtoken");

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  console.error("WARNING: JWT_SECRET_KEY is not defined!");
}

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ error: `Invalid token: ${err.message}` });
  }
};

module.exports = { verifyToken };