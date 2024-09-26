// Importing all the libraries
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const app = express();


// Importing all the required files
const StudentRouter = require('./student_app/routes');
const TeacherRouter = require('./teacher_app/routes');
const AdminRouter = require('./Admin/routes');

app.use('/api/v1/admin',AdminRouter);

// Route Handling
module.exports = app;
