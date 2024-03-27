'use strict'

const axios = require("axios");

// Getting dependencies

const {
} = process.env;

// Creating health check response
const healthCheckResponse = () => {
    return { data: { message: "Server is Working", datetime: Date.now() } };
}

module.exports = {
    healthCheckResponse
}
