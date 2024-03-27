// validationMiddleware.js
const { validationResult } = require('express-validator');

/**
 * Validation middleware.
 *
 * This middleware is used to validate incoming request data
 * based on the validation rules defined in the request handlers.
 * If there are any validation errors, it sends a 400 Bad Request
 * response with the validation errors in the response body.
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 *
 * @returns {Object} Express response object if there are validation errors,
 * or calls the next middleware function if the validation succeeds.
 */
const validate = (req, res, next) => {
  /**
   * Extract validation errors from the request.
   *
   * @type {Object} An object containing validation errors.
   */
  const errors = validationResult(req);
  /**
   * If there are any validation errors,
   * send a 400 Bad Request response with the errors in the body.
   */
  if (!errors.isEmpty()) {
    
    const error = errors.array()[0];
    console.log("error",error)
    return res.status(400).json({ message: `Validation failed ${error.path} : ${error.msg}`,errors: errors.array() });
  }
  /**
   * If there are no validation errors, call the next middleware function.
   */
  next();
};

module.exports = validate;
