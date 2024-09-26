const express = require('express');
const CreateUser = require('./controllers/AddUser');
const router = express.Router();

router
  .route('/student')
  .post(CreateUser.AddStudent);


router
  .route('/teacher')
  .post(CreateUser.AddTeacher);
 
module.exports = router;