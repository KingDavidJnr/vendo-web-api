// middleware/authMiddleware.js
const { verifyAndDecodeJWT } = require('../utils/jwtUtils');

const authenticateUser = (req, res, next) => {
  // Extract the JWT token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  try {
    // Verify and decode the JWT token
    const decoded = verifyAndDecodeJWT(token);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authenticateUser;
