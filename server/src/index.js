'use strict'

// Getting dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const connectToDatabase = require('./middlewares/database');
var path = require('path');
const morgan = require('morgan');
// Middlewares
const { response, errorHandler } = require('./middlewares');

// Creating express app
const app = express();

// Connect to database before starting the server
connectToDatabase(process.env.MONGODB_URL);
  

// HTTP header Security
var helmet = require('helmet');
app.use(helmet());

// secure your various HTTP headers
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(express.static(path.join(__dirname, "./uploads")));
app.use(fileUpload());
// Body parser Configurations
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));


// Getting dependency
const dotenv = require('dotenv');
dotenv.config();

// using middlewares
app.use(response);
app.use(cors());
app.use(bodyParser.json());

// Getting all routes
const {
    indexRoutes,
} = require('./routes');

// Routes
app.use('/', indexRoutes);

// catch 404 and forward to error handler
app.use((req, res) => { return res.reply({ statusCode: 404 }) });
app.use(errorHandler);

app.use(function (err, req, res, next) {
    console.log("====================== Error Before App Crashed ======================")
    console.log(err)
    console.log(err.status)
});

  // Use morgan for logging requests
  app.use(morgan('dev'));

module.exports = app;
