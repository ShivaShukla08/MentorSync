const express = require('express');
const testingControllers = require('../Controllers/TestingControllers');

//Middlewares
const studentInGroupMiddleware = require('../middleware/studentInGroupMiddleware');
const studentNotInGroupMiddleware = require('../middleware/studentNotInGroupMiddleware');
const isGroupExistsMiddleware = require('../middleware/IsGroupExistsMiddleware');
const isStudentExistsMiddleware = require('../middleware/checkStudentExists');
const validateGroupStudentRequest = require('../middleware/validateStudentGroupRequest');
const validateJoinRequestSGMiddleware = require('../middleware/validateJoinRequestS&G');

//Controllers
const joinRequestController = require('../Controllers/StudentControllers/sendJoinRequestController');
const acceptInvitationsController = require('../Controllers/StudentControllers/acceptInvitationsController');
const rejectInvitationsController = require('../Controllers/StudentControllers/rejectInvitationsController');
const leaveGroupController = require('../Controllers/StudentControllers/groupLeaveController')

const router = express.Router();

router.use(testingControllers.UserLoginSuccessfull);


// All routes for students who are not assigned to any group
router
  .route('/group/g/:groupId/send-invitation')
  .post(
    isGroupExistsMiddleware.isGroupExists,  studentNotInGroupMiddleware.studentNotInGroup, validateJoinRequestSGMiddleware.validateGroupStudentJoinRequest,
    joinRequestController.sendJoinRequestToGroup 
);





//check student present in a Group.
router.use(studentInGroupMiddleware.studentInGroup);



//All routes for students who are present to any GROUP.
router
  .route('/mygroups/s/:studentId/send-invitation')
  .post(
    isStudentExistsMiddleware, studentNotInGroupMiddleware.studentNotInGroup, validateJoinRequestSGMiddleware.validateGroupStudentJoinRequest,
    joinRequestController.sendGroupInviteToStudent
);

router
  .route('/mygroups/s/:studentId/accept-invitation')
  .post(
    isStudentExistsMiddleware, studentNotInGroupMiddleware.studentNotInGroup, validateGroupStudentRequest,
    acceptInvitationsController.acceptStudentRequestByGroup 
);

router
  .route('/mygroups/s/:studentId/reject-invitation')
  .post(
    isStudentExistsMiddleware, validateGroupStudentRequest, 
    rejectInvitationsController.rejectStudentRequestByGroup 
);

router
.route('/group/leave')
.patch( 
   leaveGroupController.leaveGroup 
);

module.exports = router;
