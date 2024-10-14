const mongoose = require('mongoose');
const requestTableGroupAndStudent = require('../../models/RequestTableGroupAndStudentModel');

// Groups, Accept a student join request
exports.acceptStudentRequestByGroup = async (req, res) => {
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

        // check if student has send request to group or not.
        if (reqData.type == 1 || reqData.rollback === true) {
            return res.status(404).json({
                message: "The page you are looking for does not exist. Please check the URL.",
            });
        };

        // check if the group has already accepted the request.
        if (reqData.accept2 === 'accept') {
            return res.status(404).json({
                message: "Group is already accept the Invitations",
                studentId: reqData.studentId
            });
        }

        // check if the group has already reject the request. 
        if (reqData.accept2 === 'reject') {
            return res.status(404).json({
                message: "Group is already reject the Invitation, you can't accept Invitation",
                studentId: reqData.studentId
            });
        }


        // check if the group's status is full
        if (userGroup.status === 'full') {
            return res.status(403).json({
                message: "Your group is full. Please update the group status before adding a new member",
            });
        };

        // //check if student are present in any group.
        // if (req.paramDetails.user.groupId) {
        //     return res.status(403).json({
        //         message: "Student are alredy present in any group",
        //     });
        // };


        //update the accept2 field
        reqData.accept2 = "accept";

        //Save the updated document
        await reqData.save();

        res.status(200).json({
            status: 'success',
            message: "Invitation accepted successfully",
            data: reqData
        })
    } catch (err) {
        res.status(500).json({ status: 'fail', message: 'server Error.' })
    }
}
