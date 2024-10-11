const mongoose = require('mongoose');
const requestTable = require('./../models/RequestTableGroupAndStudentModel');

const validateGroupStudentRequest = async function(req,res,next){
    try{

        // Logic: We need groupID and studentId to check in requestTable...

        var groupId, studentId;

        // Step1: Identify the type of request (0 or 1).
        
           // if Type 1
           if(req.params.studentId){
              studentId =  req.params.studentId;
              groupId = req.user.groupId;
           }

           // if Type 0
           if(req.params.groupId){
            groupId = req.params.groupId;
            studentId = req.user.id
         }

        // Step 2: Check if both student_id and group_id exist in the requestTable

        const requestExists = await requestTable.findOne({
            student_id: studentId,
            group_id: groupId
        });


        // Step 3: Handle the result
        if (requestExists) {
            next();
        } else {
            return res.status(200).json({ message: 'Request already exists.', request: requestExists });
        }
        
    }
    catch(error)
    {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = validateGroupStudentRequest;