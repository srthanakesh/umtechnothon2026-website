const jwt = require("jsonwebtoken");

require("dotenv").config();

// Secret key to sign the JWT. You should keep this secure.
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Generate a JWT
const generateToken = (participantId, full_name, email, role, team_id) => {
  const payload = {
    participantId,
    full_name,
    email,
    role,
    team_id
  };

  // Generate JWT token with 1 hour expiration
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
  return token;
};

module.exports = { generateToken };
