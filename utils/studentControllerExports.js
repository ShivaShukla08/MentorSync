// utils/studentControllers.js

// Import all controllers from StudentControllers
const acceptInvitation = require('../Controllers/StudentControllers/acceptInvitation');
const allSendInvitations = require('../Controllers/StudentControllers/allSendInvitations');
const rejectInvitation = require('../Controllers/StudentControllers/rejectInvitation');
const allReceivedInvitations = require('../Controllers/StudentControllers/allReceivedInvitations');
const createGroup = require('../Controllers/StudentControllers/createGroup');
const sendRequest = require('../Controllers/StudentControllers/sendRequest');

// Export all controllers as an object
module.exports = {
    acceptInvitation,
    allSendInvitations,
    rejectInvitation,
    allReceivedInvitations,
    createGroup,
    sendRequest,
};
