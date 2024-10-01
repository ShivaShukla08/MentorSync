const mongoose = require('mongoose');
const presentationGroup = require('./PresentationGroupsModel');

const RequestTableGroupAndMentorSchema = new mongoose.Schema({

    groupId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'presentationGroup',
        required: true 
    },

    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacherDetail',
        required: true 
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectDetail',
        required: true 
    },

    rollback: {
       type: Boolean,
       default: false
    },

    valid: {
        type: Boolean,
        default: false 
    },

    status: {
        type: String,
        enum: ['pending', 'accept', 'reject'],
        default: 'pending'
    },

    message:{
        reject: [{
            projectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'projectDetail'
            },
            message: {
                type: String,
                trim: true,
                minlength: 10,
                maxlength: 500,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }],

        accept: {
            projectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'projectDetail'
            },
            message: {
                type: String,
                trim: true,
                minlength: 10,
                maxlength: 500,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }   
        }
    },

    createdAt: {
        type: Date,
        date: Date.now()
    }
});



const requestTableGroupAndMentor = mongoose.model('requestTableGroupAndMentor', RequestTableGroupAndMentorSchema);

module.exports = requestTableGroupAndMentor;
