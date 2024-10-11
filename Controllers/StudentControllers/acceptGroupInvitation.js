const groupStudentRequestModel = require('./../../models/RequestTableGroupAndStudentModel');
const PresentationGroupsModel = require('./../../models/PresentationGroupsModel');
const studentDetailModel = require('./../../models/StudentDetailModel')

const acceptGroupInvitation = async (req,res) => {

    try{
        // Step1: Get the student and group id
            console.log("groupId", req.params.groupId);
            groupId = req.params.groupId;
            studentId = req.user.id;

            // console.log(studentId, groupId);

        /* Step2: As this is (Group ---> Student) request so we will be dealing with accept2 colm of RequestTable
                  We will be marking the accept2 state as accepted*/

            const result = await groupStudentRequestModel.updateOne(
                { groupId: groupId, studentId: studentId, accept2: "pending" }, 
                { $set: { accept2: "accept" } }
            );
           
        // console.log(result);

        // Step3: After Modifying the requestTable we have to add that student to that group by modifying presentationGroup table.
            const updatedGroup = await PresentationGroupsModel.findByIdAndUpdate(
                groupId,
                { $addToSet: { groupMembers: studentId } }, // Add studentId to groupMembers, ensuring no duplicates
                { new: true, runValidators: true } 
            );

        // Step 4: Mark the group field in student
            const updatedStudent = await studentDetailModel.findByIdAndUpdate(
                studentId,                
                { groupId: groupId },  
                { new: true }            
            );


        // Step 5: returning the response
            return res.status(200).json({
                status: "Ok",
                message: "Student added to group successfully!",
            });
    }
    catch(error)
    {
        return res.status(500).json({
            message: "An error occurred while accepting the request.",
            error: error.message,
          });
    }
    
}

module.exports = acceptGroupInvitation;