const mongoose = require('mongoose');
const requestTableGroupAndStudent = require('../../models/RequestTableGroupAndStudentModel');

// students, send request to group 
exports.sendJoinRequestToGroup = async (req, res) => {
    try {
        const note = req.body.note || "";
        const studentId = req.user._id;
        const groupId = req.params.groupId;

        // check by studentId and groupId 
        const filter = {
            studentId: studentId,
            groupId: groupId
        };

        //creating or updating the data
        const reqData = {
            note: note,
            type: 0,
            validity: {
                "first": true,
                "second": true
            },
            accept1: "pending",
            accept2: "pending",
            rollback: false,
            createdAt: new Date(),              
        };

        const options = {
            new: true,     // returns the updated data if it exists
            upsert: true,  // creates a new data if no studentid and groupid exists
            setDefaultsOnInsert: true // applies default values for new doc
        };

        // Update if exists, create if not.
        const data = await requestTableGroupAndStudent.findOneAndUpdate(filter, reqData, options);


        return res.status(200).json({
            status: 'success',
            message: 'you have successfully send to request to group.',
            data: data
        });

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: "Server Error"
        });
    }
};
