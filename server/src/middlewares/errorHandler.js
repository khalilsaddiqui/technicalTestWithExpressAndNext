'use strict'

/**
 * Error handler middleware.
 *
 * @param {Error} err Error object.
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @param {Function} next Express next middleware function.
 *
 * @description
 * This middleware is used to handle any errors that occur during
 * request/response cycle.
 *
 * It sets the error message and stack trace depending on the environment
 * variable NODE_ENV and sends a JSON response with the error details.
 */
const errorHandler = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // If the error is a Joi validation error or a MySQL error
    // send a 422 (Unprocessable Entity) status code.
    if (err.isJoi || err.hasOwnProperty('sqlMessage'))
        err.status = 422;

    // Send a JSON response with error details.
    res.status(422).json({
        data: err,

        // Set the status code to 400 if not set by the error handler.
        statusCode: err.status || 400
    });
};

module.exports = {
    errorHandler
};
