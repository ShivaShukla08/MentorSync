const express = require('express');
const validateGroupStudentRequest = require('./../middleware/validateStudentGroupRequest'); 
const isGroupFull = require('./../middleware/isGroupFull');
const checkstudentexits = require('./../middleware/checkStudentExists');

const router = express.Router();

router.route('/checkValidateGroupStudentRequest/:id')
      .post(validateGroupStudentRequest);


router.route('/isGroupFull')
      .post(isGroupFull)


router.route('/checkstudentexists/:id')
.get(checkstudentexits);

module.exports = router