// utils/middleware.js

// Import all middleware from middleware
const IsGroupAdmin = require('../middleware/IsGroupAdminMiddleware');
const isGroupFull = require('../middleware/isGroupFull');
const studentNotInGroup = require('../middleware/studentNotInGroupMiddleware');
const IsGroupExists = require('../middleware/IsGroupExistsMiddleware');
const checkStudentExists = require('../middleware/checkStudentExists');
const leaveGroup = require('../middleware/leaveGroupMiddleware');
const validateStudentGroupRequest = require('../middleware/validateStudentGroupRequest');
const studentInGroup = require('../middleware/studentInGroup');
const validateJoinRequest = require('../middleware/validateJoinRequestS&G')

// Export all middleware as an object
module.exports = {
    IsGroupAdmin,
    isGroupFull,
    studentNotInGroup,
    IsGroupExists,
    checkStudentExists,
    leaveGroup,
    validateStudentGroupRequest,
    studentInGroup,
    validateJoinRequest
};
