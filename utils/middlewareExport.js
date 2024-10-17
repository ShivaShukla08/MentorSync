// utils/middleware.js

// Import all middleware from middleware
const IsGroupAdminMiddleware = require('../middleware/IsGroupAdminMiddleware');
const isGroupFull = require('../middleware/isGroupFull');
const studentNotInGroupMiddleware = require('../middleware/studentNotInGroupMiddleware');
const IsGroupExistsMiddleware = require('../middleware/IsGroupExistsMiddleware');
const checkStudentExists = require('../middleware/checkStudentExists');
const leaveGroupMiddleware = require('../middleware/leaveGroupMiddleware');
const validateStudentGroupRequest = require('../middleware/validateStudentGroupRequest');

// Export all middleware as an object
module.exports = {
    IsGroupAdminMiddleware,
    isGroupFull,
    studentNotInGroupMiddleware,
    IsGroupExistsMiddleware,
    checkStudentExists,
    leaveGroupMiddleware,
    validateStudentGroupRequest,
};
