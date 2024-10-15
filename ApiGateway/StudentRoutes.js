const express = require("express");
const router = express.Router();

//..............................All middlewares are below....................................................//
const checkStudentExists = require('./../middleware/checkStudentExists');
const isGroupAdmin = require('./../middleware/IsGroupAdminMiddleware');
const isGroupExists = require('../middleware/IsGroupExistsMiddleware');
const isGroupFull = require('./../middleware/isGroupFull');
const leaveGroup= require('./../middleware/leaveGroupMiddleware');
const studentNotInGroup = require('../middleware/studentNotInGroupMiddleware');
const validateGroupStudentRequest = require('../middleware/validateStudentGroupRequest');

//..............................All controllers are below....................................................//


router.use(restrict('student'));


router.route('/requests-received')
      .get()
      