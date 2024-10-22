const mongoose = require('mongoose');
const requestTableGroupAndStudent = require('../../models/RequestTableGroupAndStudentModel')

const leaveGroup = async(req, res) => {
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

        const totalNormalStudent = group.role.user.length;

        //if student is normal user then remove studentId in user arrays
        group.role.user = group.role.user.filter(
            (id) => id.toString() !== studentId.toString()
        );

        //check if student is Admin user, then remove studentId in Admin arrays
        if(totalNormalStudent === group.role.user.length){
            group.role.admin = group.role.admin.filter(
                (id) => id.toString() !== studentId.toString()
            );

            // if group Admin are not present
            if(group.role.admin.length === 0 && group.role.user.length > 0){
                // make admin of normal user
                group.role.admin.push(group.role.user[0]); 
                group.role.user.shift();  // remove the userID of userArray's
            }
        }

        // remove groupId from studentDetail Table.
        user.groupId = undefined;

        // add groupId in previousLeavegroup array of studentDetails Table
        user.leaveGroup.push(group._id);

        // updated requesttablegroupandstudent table in validity field
        await requestTableGroupAndStudent.updateMany(
            { studentId: user._id }, 
            { $set: { 'validity.first': false } },
          );
            
        // save doc
        await user.save();
        await group.save();
                  
        return res.status(200).json({
            status: 'success',
            message: 'you have successfully leave the group.',
        });
            
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: 'Server Error'
        });
    }
}

module.exports = leaveGroup;