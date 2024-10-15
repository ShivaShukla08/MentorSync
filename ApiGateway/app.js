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
const commonRouter = require('./commonRoutes');

app.use('/api/v1/student/', studentRouter);
app.use('/api/v1/teacher/',teacherRouter);
app.use('/api/v1/admin/',adminRouter);
app.use('/api/v1/testing/',testingRouter);
app.use('/api/v1/', commonRouter);


app.use(express.json());

// Route Handling
module.exports = app;