const mongoose = require('mongoose');
const studentDetail = require('../models/StudentDetailModel');


exports.studentNotInGroup = async (req, res, next) => {

    let groupId = null;
    // If the URL contains a studentId, check that student is any group or not.
    if (req.params.studentId) {
        if (req.paramDetails.user) {
            groupId = req.paramDetails.user.groupId;
        } else {
            // If req.group is not present in req object, retrieve the groupId from the studentDetails table.
            const checkUser = await studentDetail.findOne({ _id: req.params.studentId });
            groupId = checkUser.groupId.toString();
        }
    } else {
        // Get studentId, that student are login and sudentId are verify by jwt-token and get student group details in StudentDetails Tables
        // check login User is in any group or not

        groupId = req.user.groupId;
    }

    // check if the student is in any group then return it.
    if (groupId) {
        //if studentId is present in params, send message
        if(req.params.studentId){
            return res.status(403).json({
                status: 'fail',
                message: 'Student is already present in any group!.'
            });
        }else{
            return res.status(403).json({
                status: 'fail',
                message: 'You are already in any group!.'
            }); 
        }
    }
    // Check if student not in any group then move to next middleware
    next();
};
