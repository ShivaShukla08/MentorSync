// Importing all the libraries
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const app = express();

// Importing all the required files
const studentRouter = require("./StudentRoutes");
const teacherRouter = require("./TeacherRoutes");
const adminRouter = require("./AdminRoutes");
const commonRouter = require('./commonRoutes');
const authRouter = require('./authRoutes');

// Import Error File
const AppError = require('../utils/appError');
const globalErrorHandler = require('../utils/errorHandling');
const notFoundHandler = require('../utils/notFoundHandler');


// Body parser, reading data from body into req.body
app.use(express.urlencoded({ extended: true })); 
app.use(express.json({ limit: '2Mb' }));

app.use('/api/v1/student/', studentRouter);
app.use('/api/v1/teacher/',teacherRouter);
app.use('/api/v1/admin/',adminRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/', commonRouter);


app.use(globalErrorHandler);

// Catch-all for undefined routes
app.use(notFoundHandler);

// Route Handling
module.exports = app;