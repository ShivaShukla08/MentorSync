const express = require("express");
const router = express.Router();

const middleware = require('./../utils/middlewareExport');
const studentControllers = require('./../utils/studentControllerExports');
const groupControllers = require('./../utils/groupControllerExports');
const authControllers = require('./../utils/authControllerExport');

// Authorize all Routes.
router.use(authControllers.authorizeToken);

// restrict all routes only for student
router.use(authControllers.authorizeRole('student'));

// All routes for students who are not assigned to any group
router
    .route('/g/:groupId/send-request')
    .post(middleware.IsGroupExists,
          middleware.studentNotInGroup,
          middleware.isGroupFull,
          middleware.validateJoinRequest,
          studentControllers.sendRequest
    );











//All routes for students who are present to any GROUP.

//check students are present in a Group.
router.use(middleware.studentInGroup);

router
    .route('/group/s/:studentId/send-invitataion')
    .post(middleware.checkStudentExists,
          middleware.studentNotInGroup,
          middleware.isGroupFull,
          middleware.validateJoinRequest,
          groupControllers.sendInvitation);
router
    .route('/group/s/:studentId/accept-invitataion')
    .post(middleware.checkStudentExists,
          middleware.studentNotInGroup,
          middleware.isGroupFull,
          groupControllers.acceptInvitation);

router
    .route('/group/s/:studentId/reject-invitataion')
    .post(middleware.checkStudentExists,
          middleware.studentNotInGroup,
          middleware.isGroupFull,
          groupControllers.rejectInvitation);
router
    .route('/group/leave')
    .patch(
        // middleware.leaveGroup,
           groupControllers.leaveGroup);




module.exports = router;