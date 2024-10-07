const express = require('express');
const testingControllers = require('../Controllers/TestingControllers');
const studentNotInGroupMiddleware = require('../middleware/studentNotInGroupMiddleware');
const leaveGroupMiddleware = require('../middleware/leaveGroupMiddleware'); 
const IsGroupAdminMiddleware = require('../middleware/IsGroupAdminMiddleware'); 

const router = express.Router();

router
  .route('/use-middleware/student/:studentId/send')
  .get(
    testingControllers.UserLoginSuccessfull, 
    studentNotInGroupMiddleware.studentNotInGroup, 
    IsGroupAdminMiddleware.isGroupAdmin, 
    leaveGroupMiddleware.leaveGroup,   
    testingControllers.finalcontrollerfunctions
  );

module.exports = router;
