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
const testingRouter = require("./TestingRoutes")

// Body parser, reading data from body into req.body
app.use(express.urlencoded({ extended: true })); 
app.use(express.json({ limit: '2Mb' }));


// Add Routes
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/test', testingRouter);

app.use(express.json());

// Route Handling
module.exports = app;
