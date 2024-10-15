// utils/commonControllers.js

// Import all controllers from CommonControllers
const groupDetails = require('../Controllers/CommonControllers/groupDetails');
const groupList = require('../Controllers/CommonControllers/groupList');
const studentDetails = require('../Controllers/CommonControllers/studentDetails');
const studentList = require('../Controllers/CommonControllers/studentList');

// Export all controllers as an object
module.exports = {
    groupDetails,
    groupList,
    studentDetails,
    studentList,
};
