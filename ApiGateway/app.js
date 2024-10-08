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
const TeacherRouter = require("./TeacherRoutes");
const adminRouter = require("./AdminRoutes");
const testingRouter = require("./testingRoutes");

app.use(express.json());


app.use('/testingroutes',testingRouter);
// Route Handling
module.exports = app;
