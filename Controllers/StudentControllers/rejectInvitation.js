const { model } = require('mongoose');
const requestDetails = require('../../models/RequestTableGroupAndStudentModel');

const rejectInvitation = async (req, res) => {

    try {
        // Step1 : Get the groupId and studentId
        const groupId = req.params.groupId;
        const studentId = req.user.id;

        // Step 2: Get the reject the message 
        const rejectMessage = req.body.message;
        const updatedRequestDetails = await requestDetails.findOneAndUpdate(
            {groupId, studentId},
            {
                $set: { accept2: "reject" },
                $push: { rejectMessage } 
            },
            {new: true}
        )

        // Step 3: Return the response 
        res.status(200).json({
            status: "Ok",
            message: "Group Invitation rejected successfully"
        })

    }catch (error) {
        res.status(500).json({ message: "Internal Server Errors" });
    }
   
}

module.exports = rejectInvitation;