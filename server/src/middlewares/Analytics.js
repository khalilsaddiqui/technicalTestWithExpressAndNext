const Analytics = require('../models/Analytics');

/**
 * Middleware function to log request path, method, timestamp, IP address,
 * user agent, status code, and user ID (if authenticated)
 * 
 * This middleware assumes that the user authentication middleware is executed
 * before this middleware, and sets req.user.userId if the user is authenticated.
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Next middleware function in the chain
 */
const analyticsRequest = (req, res, next) => {
  // Log request path, method, timestamp, IP address, user agent, status code,
  // and user ID (if authenticated)
  const analyticsData = new Analytics({
    path: req.path,
    method: req.method,
    timestamp: new Date(),
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
    statusCode: res.statusCode, // Assuming response status code is set before sending response
    userId: req.user ? req.user.userId : null, // Assuming you have user authentication middleware that sets req.user
  });

  analyticsData.save()
    .then(() => {
      // Log success to console
      console.log('Analytics data saved');
    })
    .catch((err) => {
      // Log error to console
      console.error('Error saving analytics data:', err);
    });

  // Call next middleware function in the chain
  next();
}


  module.exports = analyticsRequest;  
