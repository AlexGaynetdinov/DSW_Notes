const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function authenticateToken(req, res, next) {
  // Get the token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_HERE

  if (token == null) return res.sendStatus(401); // No token, unauthorized

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID encoded in the token
    const foundUser = await User.findById(decoded.id);
    if (!foundUser) return res.sendStatus(404); // User not found

    // Attach user to the request object
    req.user = foundUser;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.sendStatus(403); // Invalid token or other error
  }
}

module.exports = authenticateToken;
