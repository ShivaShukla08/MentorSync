const mongoose = require('mongoose');
const RequestTableGroupAndStudent = require('../models/RequestTableGroupAndStudentModel');

exports.validateGroupStudentJoinRequest = async (req, res, next) => {
    try {

        let groupId, studentId;

        // Step1: Identify the type of request (0 or 1).
        // if Type 1 (group sending request)
        if (req.params.studentId) {
            studentId = req.params.studentId;
            groupId = req.user.groupId;
        }

        // if Type 0 (student sending request)
        if (req.params.groupId) {
            groupId = req.params.groupId;
            studentId = req.user.id
        }

        // Step 2: Check if both studentID and groupID exist in the request Table
        const requestData = await RequestTableGroupAndStudent.findOne({ studentId: studentId, groupId: groupId });

        // step 3: if join request does't exists, goto next middlewares
        if (!requestData) {
            return next();
        }

        // Check if the rollback is true
        if (requestData.rollback) {

            const oneDay = 24 * 60 * 60 * 1000;
            const timeSinceRollback = new Date() - requestData.createdAt;

            // type 0:  Check if the student has previously rolled back a request
            if (requestData.type == 0) {
                // if student sends a request again
                if (req.params.groupId) {
                    // If less than 24 hours have passed since the rollback, prevent the student from sending a new request
                    if (timeSinceRollback < oneDay) {
                        return res.status(403).json({
                            message: 'You cannot send a new request to this group. Please wait 24 hours after rolling back your request.',
                            data: requestData.groupId,
                        });
                    }
                    return next();
                } else {
                    // if group sends a request to the student
                    return next();
                }
            } else {
                //type 1:  if the group has previously rolled back a request
                // if group send a request again
                if (req.params.studentId) {
                    // If less than 24 hours have passed since the rollback, prevent the student from sending a new request
                    if (timeSinceRollback < oneDay) {
                        return res.status(403).json({
                            message: 'You cannot send a new request to this student. Please wait 24 hours after rolling back your request.',
                            data: requestData.studentId,
                        });
                    }
                    return next();
                } else {
                    // if student sends a request to the Group.
                    return next();
                }
            }
        };

        //step 4: implement validation for rejections, 
        //if data is available in the request Table and has not been rejected by any group or student, an error message should be returned directly
        if (requestData && requestData.rejectMessage.length === 0) {
            return res.status(403).json({
                message: 'You have already send invitations request.',
                data: {
                    groupId: requestData.groupId,
                    studentId: requestData.studentId
                },
            });
        }

        //After 20 join request-rejected, user can't send request
        if (requestData.rejectMessage.length >= 20) {
            return res.status(403).json({
                message: 'You have reached the maximum limit of sending requests. You cannot send any more requests to the same group or student.',
                data: {
                    groupId: requestData.groupId,
                    studentId: requestData.studentId
                },
            });
        }

        //step 5: If a rejection occurs, it ensures that student or group are send-invitation agian.
        // if rejectedMessage time must be less than of request send time
        const reqTime = requestData.createdAt;

        // check latest rejectmessage time in Array
        const lastRejectMessTime = requestData.rejectMessage[requestData.rejectMessage.length - 1].createdAt

        // if latest rejectedMessage time is greater than request send time, this time student or group are send-invitation agian
        if (lastRejectMessTime > reqTime) {
            return next();
        }

        return res.status(403).json({
            message: 'You have already send invitations request.',
            data: {
                groupId: requestData.groupId,
                studentId: requestData.studentId
            },
        });

    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};