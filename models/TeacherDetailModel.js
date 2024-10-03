const mongoose = require('mongoose');
const validator = require('validator');

const teacherDetailSchema = new mongoose.Schema({
    tid: {
        type: String,
        required: [true, 'Please enter your Id'],
        unique: true,
        trim: true,
        lowercase: true
    },

    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
    },

    age: {
        type: Number,
        required: [true, 'Please enter your age'],
        min: [18, 'Age cannot be less than 18'], // Add a min age check
        max: [100, 'Age cannot be greater than 100']
    },

    gender: {
        type: String,
        required: [true, 'Please specify your gender']
    },

    personalMail: {
        type: String,
        validate: {
            validator: function (v) {
                return /@gmail\.com$/.test(v);
            },
            message: props => `${props.value} is not a valid Gmail!`
        }
    },

    contactNo: {
        type: Number,
        required: [true, 'Please enter your contact number'],
        validate: {
            validator: function (v) {
                // Check if the number has exactly 10 digits return /^\d{10}$/.test(v.toString());
                return /^\d{10}$/.test(v.toString());
            },
            message: "Please enter a valid 10-digit contact number",
        },
    },

    group: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'presentationGroups'
    }],

    school: {
        type: String,
        required: [true, 'Please specify your school']
    },

    photo: {
        type: String,
        default: 'default_photo.jpg',
    },

    profileSummary: {
        type: String,
        maxlength: [500, 'Profile summary cannot exceed 500 characters'],
        select: false
    },

    workExperience: {
        type: String,
        maxlength: [500, 'Work experience cannot exceed 500 characters'],
        select: false
    },

    researchInterests: {
        type: String,
        maxlength: [500, 'Research interests cannot exceed 500 characters'],
        select: false
    },

    status: {
        type: String,
        enum: ['full', 'notFull'],
        default: 'notFull'
    },
});

const teacherDetail = mongoose.model('teacherDetail', teacherDetailSchema);

module.exports = teacherDetail;
