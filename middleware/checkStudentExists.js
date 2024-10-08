const StudentDetail = require('./../models/StudentDetailModel'); 

const checkStudentExists = async function (req, res, next){
    
    try {

        const studentId = req.params.id;
        console.log(studentId)

        /* Step2: If the student exists, then we will fetch his detail from studentDetail table and store it 
                in (req.paramDetail).studentDetail. We are storing his detail here to avoid database
                search regarding his detail in future.                                               */

        const studentDetail =  await StudentDetail.findById({_id: studentId});
        console.log(studentDetail);

        if (!studentDetail){

        return res.status(404).json({
            status: 'fail',
            message: `No student found with ID: ${studentId}`,
        });

        }

        if (!req.paramDetails){ req.paramDetails = {}; } 
       
        req.paramDetails.user = studentDetail; 
        next();

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Requested student does not exists ',
        });
    }
  };

module.exports = checkStudentExists;