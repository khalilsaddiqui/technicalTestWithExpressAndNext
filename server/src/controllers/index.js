"use strict";

// Getting Dependencies
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const Analytics = require('../models/Analytics');
const uploadFiles = require('../utils/uploadFiles');


/**
 * User registration endpoint
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express next middleware function
 * @returns {Object} express response object
 */
exports.userRegistration = async (req, res, next) => {
  try {
    // Extract user input data
    const { username, email, password } = req.body;
    // Validate user input data

    // Check if user with same email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      // Return error if user already exists
      return res.reply({
        statusCode: 400,
        message: "Email already exists",
      });
    }

    // Check if user with same email already exists
    const existingUserName = await User.findOne({ username: username });
    if (existingUserName) {
      // Return error if user already exists
      return res.reply({
        statusCode: 400,
        message: "username already exists",
      });
    }

    // Create new user document
    const user = new User({ username, email, password });
    // Save user document to database
    await user.save();
    // Return success response
    return res.reply({
      statusCode: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    // Print error to console
    console.error(error);
    // Return error response
    return res.reply({
      statusCode: 400,
      message: "Something went wrong",
      data: error,
    });
  }
};

/**
 * User login endpoint
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Function} next express next middleware function
 * @returns {Object} express response object
 */
exports.userLogin = async (req, res, next) => {
  try {
    // Extract user input data
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      // Return error if email doesn't exist or password is incorrect
      return res.reply({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }

    // Compare user entered password with stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Return error if email doesn't exist or password is incorrect
      return res.reply({
        statusCode: 401,
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return success response with JWT token
    return res.reply({
      statusCode: 200,
      message: "User login successfully",
      data: token
    });
  } catch (error) {
    // Print error to console
    console.error(error);
    // Return error response
    return res.reply({
      statusCode: 400,
      message: "Something went wrong",
      data: error,
    });
  }
};

/**
 * Update user profile endpoint
 * @param {Object} req express request object
 * @param {Object} req.body request body containing user details
 * @param {string} req.body.name user's name
 * @param {string} req.body.email user's email
 * @param {Object} res express response object
 * @param {Function} next express next middleware function
 * @returns {Object} express response object
 */
exports.userProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body; // Get user details from request body

    // Validate and sanitize user input

    const userId = req.user.userId; // Get user ID from JWT

    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true }); // Update user details

    if (!updatedUser) {
      return res.reply({ // Return error if user not found
        statusCode: 404,
        message: "User not found"
      });
    }
    return res.reply({ // Return success response
      statusCode: 200,
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error(error);
    return res.reply({ // Return error response
      statusCode: 400,
      message: "Something went wrong",
      data: error,
    });
  }
};
/**
 * Update user profile avatar endpoint
 * @param {Object} req express request object
 * @param {Object} req.files express uploaded file object
 * @param {Object} res express response object
 * @param {Function} next express next middleware function
 * @returns {Object} express response object
 */
exports.userProfileAvatar = async (req, res, next) => {
  try {
    let userAvatar;
    // Get uploaded files from request
    if (req.files != null) {
        let files = req.files.avatar;
        // Call file upload utility function to upload files
        let result = await uploadFiles.uploadImages(files, 'user');
        // Check if upload is successful
        if (!result.success) {
            return res.reply({
              statusCode: 400,
              message: "error"
            });
        }
        // Set avatar url to uploaded file url
        userAvatar = result.images[0];
    }
    // If no file uploaded, set avatar url to default value
    else {
        userAvatar = "NA";
    }
    const userId = req.user.userId;
    // Find user based on JWT token and update avatar url
    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: userAvatar }, { new: true });

    // Check if user is found
    if (!updatedUser) {
      return res.reply({
        statusCode: 400,
        message: "User not found"
      });
    }
    // Return success response with updated user
    return res.reply({
      statusCode: 200,
      message: "Avatar uploaded successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error(error);
    return res.reply({
      statusCode: 400,
      message: "Something went wrong",
      data: error,
    });
  }
};

/**
 * Retrieves analytics data based on query parameters.
 * 
 * @param {Object} req The Express request object
 * @param {Object} res The Express response object
 * @param {Function} next The next middleware function
 */
exports.analytics = async (req, res, next) => {
  try {
    // Define query object to filter analytics data
    const query = {};

    // Add filters based on query parameters
    if (req.query.path) {
      query.path = req.query.path;
    }
    if (req.query.method) {
      query.method = req.query.method;
    }

    // Add more filters as needed

    // Fetch analytics data based on the query
    console.log("query", query);
    const analytics = await Analytics.find(query).sort({ timestamp: -1 }).limit(100);
    res.json(analytics);
  } catch (error) {
    console.error(error);
    return res.reply({
      statusCode: 400,
      message: "Something went wrong",
      data: error,
    });
  }
};

