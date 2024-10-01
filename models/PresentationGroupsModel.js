const mongoose = require('mongoose');

const presentationGroupSchema = new mongoose.Schema({

    groupName: {
        type: String,
        required: [true, 'Group name must be required'],
        trim: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectDetails',
    },
    requirements: [{
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 200
    }],
    groupmembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studentDetail',
            required: true,
        },
    ],
    groupMemberRoles: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        memberRoles: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 100
        }
    }],

    role: {
        admin: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studentDetail',
            required: true,
        }],
        user: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studentDetail',
        }]
    },
    status: {
        type: String,
        enum: ['full', 'notFull'],
        default: 'notFull'
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacherDetail',
    },
    guideAcId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacherDetail',
    },
    RemovingForcefully: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        removingVote: [{
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                unique: true,   // Ensures a student can only vote once
            },
            message: {
                type: String,
                trim: true,
                minlength: 5,
                maxlength: 100,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }]
    }],

    createdAt: {
        type: Date,
        date: Date.now()
    }
});



const presentationGroup = mongoose.model('presentationGroup', presentationGroupSchema);

module.exports = presentationGroup;
