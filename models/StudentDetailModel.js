const mongoose = require('mongoose');
const { Schema } = mongoose;

const student_detail = new Schema({
    sapid: String,
    name: String,
    rollno: String,
    semester: Number,
    batch: String,
    honors: String,
    activityCoordinator_id: String,
    group_id: String,
    coursedetail: {
        specialization: String,
        stream: String,
        coursename: String
    },
    courseduration: {
        startDate: Date,
        endDate: Date
    },
    contact: {
        email: String,
        contactno: String,
    },
    parentinformation:{
        name: String,
        email, String,
        contactno: String,
    },

    previousgroup: [{
        type: String,
        ref: 'Group'
    }],

    skills:[{
            type: String,
            maxlength: 100,
    }],

    role: [
        {
            default: "Student",
        }
    ],

    gender: String,
    photo: String,
})
