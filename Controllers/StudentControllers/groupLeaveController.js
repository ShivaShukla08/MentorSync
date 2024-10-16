const mongoose = require('mongoose');
const requestTableGroupAndStudent = require('../../models/RequestTableGroupAndStudentModel');


exports.leaveGroup = async(req, res) => {
    try {
        const user = req.user;
        const group = req.userGroup;
        const studentId = user._id;
       
        //Presentations Tables
        // Remove the studentID in the groupMembers field
        group.groupMembers = group.groupMembers.filter(
          (id) => id.toString() !== studentId.toString()
        );

        // Remove the student in the projectRoles
        group.projectRoles = group.projectRoles.filter(
            (el) => el.studentId.toString() !== studentId.toString()
        );

        // remove studentId of forcefullRemoving 
        group.removingForcefully = group.removingForcefully.filter(
            (vote) =>{ 
                return vote.studentId.toString() !== studentId.toString();
            }
        );

        //iterate the RemovingForcefully in arrays
        group.removingForcefully.forEach(element => {
            // Step 3: Remove the vote from the `removingVote` array
            element.removingVote = element.removingVote.filter(id => id.studentId.toString() !== studentId.toString());
           
        });

        //if student is normal user then remove studentId in user arrays
        group.role.user = group.role.user.filter(
            (id) => id.toString() !== studentId.toString()
        );

        
        

        return res.status(200).json({
            status: 'success',
            message: 'you have successfully leave the group.',
        });

    }catch(err) {
        res.status(500).json({
            status: 'fail',
            message: "Server Error"
        });
    }
}