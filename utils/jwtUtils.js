// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

const { JWT_SECRET } = process.env;

// Function to create a JWT
const createJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // You can customize the expiration time
};

// Function to verify and decode a JWT
const verifyAndDecodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createJWT,
  verifyAndDecodeJWT,
};
