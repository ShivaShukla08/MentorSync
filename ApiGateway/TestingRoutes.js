const express = require('express');
const testingControllers = require('../Controllers/TestingControllers');
const studentNotInGroupMiddleware = require('../middleware/studentNotInGroupMiddleware');
const leaveGroupMiddleware = require('../middleware/leaveGroupMiddleware'); 
const IsGroupAdminMiddleware = require('../middleware/IsGroupAdminMiddleware'); 
const isGroupExistsMiddleware = require('../middleware/IsGroupExistsMiddleware')
const router = express.Router();

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
