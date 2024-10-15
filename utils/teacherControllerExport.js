// utils/teacherControllers.js

// Import all controllers from TeacherControllers
const acceptInvitation = require('../Controllers/TeacherControllers/acceptInvitation');
const allReceivedInvitations = require('../Controllers/TeacherControllers/allReceivedInvitations');
const notificationDetail = require('../Controllers/TeacherControllers/notificationDetail');
const setNotificationStatus = require('../Controllers/TeacherControllers/setNotificationStatus');
const acceptedGroups = require('../Controllers/TeacherControllers/acceptedGroups');
const deleteNotification = require('../Controllers/TeacherControllers/deleteNotification');
const notifyGroups = require('../Controllers/TeacherControllers/notifyGroups');
const updateStatus = require('../Controllers/TeacherControllers/updateStatus');
const allNotifications = require('../Controllers/TeacherControllers/allNotifications');
const leaveGroup = require('../Controllers/TeacherControllers/leaveGroup');

// Export all controllers as an object
module.exports = {
    acceptInvitation,
    allReceivedInvitations,
    notificationDetail,
    setNotificationStatus,
    acceptedGroups,
    deleteNotification,
    notifyGroups,
    updateStatus,
    allNotifications,
    leaveGroup,
};
