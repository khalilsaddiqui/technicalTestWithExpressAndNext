'use strict'

// Getting dependencies

// Response middleware
const response = require('./response');

// Error handler middleware
const { errorHandler } = require('./errorHandler');

module.exports = {
    response,
    errorHandler
};
