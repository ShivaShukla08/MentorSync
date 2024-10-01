// Importing all the libraries
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const app = express();

// Importing all the required files
const StudentRouter = require("./StudentRoutes");
const TeacherRouter = require("./TeacherRoutes");
const AdminRouter = require("./AdminRoutes");


// Route Handling
module.exports = app;
