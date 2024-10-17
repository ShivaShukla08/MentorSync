const mongoose = require('mongoose');
const requestTableGroupAndStudent = require('../../models/RequestTableGroupAndStudentModel');

// Groups, Reject a student join request
exports.rejectStudentRequestByGroup = async (req, res) => {
    try {
        const usergroupId = req.user.groupId;
        const studentId = req.params.studentId;

        const userGroup = req.userGroup;

        let reqData;
        if (req.requestData) {
            reqData = req.requestData;
        } else {
            reqData = await requestTableGroupAndStudent.findOne({ studentId: studentId, groupId: usergroupId });
            if (!reqData) {
                return res.status(404).json({ message: "Request does't exists." });
            }
        }

        // check if student has send request to group or not and rollback 
        if (reqData.type == 1 || reqData.rollback === true) {
            return res.status(404).json({
                message: "The page you are looking for does not exist. Please check the URL...",
            });
        };

        // check if Group has already accept the request.
        if (reqData.accept2 === 'accept') {
            return res.status(403).json({
                message: "Group is already accept the Invitations, you can't reject Invitations",
                studentId: reqData.studentId
            });
        }

        // check if Group has already reject the request.
        if (reqData.accept2 === 'reject') {
            return res.status(404).json({
                message: "Group is already reject the Invitations",
                studentId: reqData.studentId
            });
        }

        // // if user group status is full
        // if (userGroup.status === 'full') {
        //     return res.status(403).json({
        //         message: "Your group is full. you can't reject Invitations",
        //     });
        // };

        // Create a new rejection message object
        const newRejectMessage = {
            message: req.body.message || "",
            createdAt: Date.now(),
        };

        // Push the new rejection message to the rejectMessage array
        reqData.rejectMessage.push(newRejectMessage);
        
        reqData.accept2 = "reject";

        //Save the updated document
        await reqData.save();

        res.status(200).json({
            status: 'success',
            message: "Invitation rejected successfully",
            data: studentId
        })
    } catch (err) {
        res.status(500).json({ status: 'fail', message: 'server Error.' })
    }
};