const StudentDetail = require('../../models/StudentDetailModel');

const fetchStudentList = async (req,res) => {
    try {

        // Step 1: Fetch the limited details only from the table
        const students = await StudentDetail.find({}, 
          "name semester courseDetail honors contact.email groupId"
        );

        // Step 2: Formatting the response before sending it
        const formattedStudents = students.map((student) => ({
          name: student.name,
          semester: student.semester,
          courseDetail: student.courseDetail,
          honors: student.honors,
          contact: { email: student.contact.email },
          groupStatus: student.groupId
            ? { status: "In Group", groupId: student.groupId }
            : { status: "Not in Group" },
        }));
    
        res.status(200).json({
          success: true,
          data: formattedStudents,
        });

      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to fetch students",
          error: error.message,
        });
      }
}

module.exports = fetchStudentList;