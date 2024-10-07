const mongoose = require('mongoose');
const presentationGroup = require('../models/PresentationGroupsModel');

exports.leaveGroup = async (req, res, next) => {
    
    const userId = req.user._id.toString();
    const groupId = req.user.groupId;

    // Get group details
    const group = await presentationGroup.findById(groupId); 

    // Check if the synopsis date has passed
    const now = new Date();
    if (now > group.synopsisDate) {
        return res.status(401).json({ status: 'fail', message: 'You cannot leave the group after the synopsis date.' });
    }

    // // Check leave score
    if (req.user.leaveScore >= 3) {
        return res.status(401).json({ status: 'fail', message: 'You cannot leave the group anymore.' });
    }
    return next();
};