const express = require('express');
const testingControllers = require('../Controllers/TestingControllers');
const studentNotInGroupMiddleware = require('../middleware/studentNotInGroupMiddleware');
const leaveGroupMiddleware = require('../middleware/leaveGroupMiddleware'); 
const IsGroupAdminMiddleware = require('../middleware/IsGroupAdminMiddleware'); 
const isGroupExistsMiddleware = require('../middleware/IsGroupExistsMiddleware')
const checkStudentExists = require('../middleware/IsGroupExistsMiddleware')
const validateGroupStudentRequest = require('./../middleware/validateStudentGroupRequest')
const acceptinvitation = require('./../Controllers/StudentControllers/acceptGroupInvitation')
const rejectInvitation = require('./../Controllers/StudentControllers/rejectGroupInvitation')
const fetchStudentList = require('./../Controllers/CommonControllers/fetchStudentsList')
const sendnotification = require('./../Controllers/GroupControllers/notifyGroupMembers')
const updateGroupStatus = require('./../Controllers/GroupControllers/updateGroupStatus');

const router = express.Router();

router.route('/testingroutes/validrequest/:studentId')
      .get(testingControllers.UserLoginSuccessfull,validateGroupStudentRequest)

router.route('/mark-full/:groupId')
.patch(testingControllers.UserLoginSuccessfull,updateGroupStatus)

router.route('/sendnotification')
      .post(testingControllers.UserLoginSuccessfull,sendnotification)


router.route('/acceptinvitation/:groupId')
      .patch(testingControllers.UserLoginSuccessfull,acceptinvitation)
    
router.route('/rejectinvitation/:groupId') 
      .post(testingControllers.UserLoginSuccessfull,rejectInvitation)

router.route('/fetchstudentlist')
      .get(fetchStudentList)
      
router
  .route('/use-middleware/student/:studentId/send')
  .get(
    testingControllers.UserLoginSuccessfull, 
    isGroupExistsMiddleware.isGroupExists,
    studentNotInGroupMiddleware.studentNotInGroup, 
    IsGroupAdminMiddleware.isGroupAdmin, 
    leaveGroupMiddleware.leaveGroup,   
    testingControllers.finalcontrollerfunctions
  );

router
  .route('/use-middleware/group/:groupId/send')
  .get(
    testingControllers.UserLoginSuccessfull, 
    isGroupExistsMiddleware.isGroupExists,  
    testingControllers.finalcontrollerfunctions
  );

module.exports = router;
