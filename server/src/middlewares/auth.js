const jwt = require('jsonwebtoken');

/**
 * Verify JWT middleware
 *
 * Checks if the request contains a valid JWT in the Authorization header
 * If not, returns a 401 response
 * If the token is valid, adds the decoded user information to the request object
 * and continues to the next middleware or route handler
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Next middleware function in the chain
 */
function verifyJWT(req, res, next) {
  // Get authorization header and check if it starts with 'Bearer '
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract token from header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token using the JWT_SECRET environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid, return a 403 response
    console.error(error);
    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = verifyJWT;
