const mongoose = require('mongoose');

exports.studentInGroup = async (req, res, next) => {
    usergroupId = req.user.groupId;

    // check if user(student) is not in group
    if (!usergroupId) {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not present in any group.',
        });
    }

    // if student is in any group then move to next middleware
    next();
};