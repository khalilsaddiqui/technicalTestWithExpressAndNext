'use strict'

// Getting dependencies
const express = require('express');

const multer = require('multer'); // Assuming Multer is installed

const upload = multer({ dest: 'uploads/' }); // Configure upload destination

// Creating index router
const indexRoutes = express.Router();

// Getting common health check response message
const { healthCheckResponse } = require('../utils/common');

// Controller
const controller = require("../controllers");
const verifyJWT = require("../middlewares/auth")
const analyticsRequest = require("../middlewares/Analytics")
const validate = require("../middlewares/validationMiddleware")
const { body } = require('express-validator');

// Creating index level routes
indexRoutes.get('/health', (req, res, next) => res.reply(healthCheckResponse));

// User Routes

// Validation rules for user registration
const registrationValidationRules = [
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
  ];

  // Validation rules for user login
const loginValidationRules = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
  ];

    // Validation rules for user login
const profileValidationRules = [
    body('name').isLength({ min: 1 }),
    body('email').isEmail(),
    
  ];
const profileImageValidationRules = [
    body('avatar').custom((value, { req }) => {
        if (!req.files) {
          throw new Error('avatar must contain a file');
        }
        return true;
      }),
  ];  
  
  

indexRoutes.post('/user/login', analyticsRequest , loginValidationRules, validate ,controller.userLogin);
indexRoutes.post('/user/register', analyticsRequest, registrationValidationRules, validate ,controller.userRegistration);
indexRoutes.put('/user/profile', verifyJWT ,analyticsRequest,  profileValidationRules, validate ,controller.userProfile);
indexRoutes.post('/user/profile/avatar', verifyJWT ,analyticsRequest, profileImageValidationRules, validate ,controller.userProfileAvatar);
indexRoutes.get('/api/analytics' , verifyJWT, analyticsRequest,controller.analytics);


// Exporting all routes
module.exports = {
    indexRoutes
};
