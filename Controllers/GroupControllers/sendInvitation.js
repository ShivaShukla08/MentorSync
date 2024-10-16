const mongoose = require('mongoose');
const requestTableGroupAndStudent = require('../../models/RequestTableGroupAndStudentModel');

//Groups, send request to student
exports.sendGroupInviteToStudent = async(req, res) =>{
    try {
        const note = req.body.note || "";
        const groupId = req.user.groupId;
        const studentId = req.params.studentId;

        // check by studentId and groupId 
        const filter = {
            studentId: studentId,
            groupId: groupId
        };

        // creating and updating data
        const reqData = {
            note: note,
            type: 1,
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
            message: 'you have successfully send to request to student.',
            data: data
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: "Server Error"
        });
    }
}

