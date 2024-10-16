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
    groupMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studentDetail',
            required: true,
        },
    ],
    projectRoles: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        groupWorkRole: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 100
        },
        _id: false, // prevent _id generation for projectRoles Field

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
    activityCoordinatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacherDetail',
    },
    removingForcefully: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            removingVote: [
                {
                    studentId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        unique: true,  // Ensures a student can only vote once
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
                    },
                    _id: false, // prevent _id generation for removingVote Field
                },
            ],
            _id: false,  // Prevent _id generation for RemovingForcefully Field
        },
    ],

    synopsisDate: {
        type: Date,
        default: null
    },

    createdAt: {
        type: Date,
        date: Date.now()
    }
});



const presentationGroup = mongoose.model('presentationGroup', presentationGroupSchema);

module.exports = presentationGroup;
