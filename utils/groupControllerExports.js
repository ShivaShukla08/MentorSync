// utils/index.js

// Import all controllers from GroupControllers
const acceptInvitation = require('../Controllers/GroupControllers/acceptInvitation');
const deleteNotification = require('../Controllers/GroupControllers/deleteNotification');
const rejectInvitation = require('../Controllers/GroupControllers/rejectInvitation');
const updateRoles = require('../Controllers/GroupControllers/updateRoles');
const allNotifications = require('../Controllers/GroupControllers/allNotifications');
const leaveGroup = require('../Controllers/GroupControllers/leaveGroup');
const removeMember = require('../Controllers/GroupControllers/removeMember');
const updateStatus = require('../Controllers/GroupControllers/updateStatus');
const allReceivedInvitations = require('../Controllers/GroupControllers/allReceivedInvitations');
const notificationDetail = require('../Controllers/GroupControllers/notificationDetail');
const sendInvitation = require('../Controllers/GroupControllers/sendInvitation');
const allSendInvitations = require('../Controllers/GroupControllers/allSendInvitations');
const notifyMembers = require('../Controllers/GroupControllers/notifyMembers');
const setNotificationStatus = require('../Controllers/GroupControllers/setNotificationStatus');

// Export all controllers as an object
module.exports = {
    acceptInvitation,
    deleteNotification,
    rejectInvitation,
    updateRoles,
    allNotifications,
    leaveGroup,
    removeMember,
    updateStatus,
    allReceivedInvitations,
    notificationDetail,
    sendInvitation,
    allSendInvitations,
    notifyMembers,
    setNotificationStatus,
};
