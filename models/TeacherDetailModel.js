const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const teacherDetailSchema = new mongoose.Schema({
    tid: {
        type: Number,
        require: [true, 'Please enter your Id'],
        unique: true,
    },

    name: {
        type: String,
        require: true,
        trim: true,
    },

    age: {
        type: Number,
        require: true,
        max: [100, 'Age are not allowed greater than 100']
    },

    gender: {
        type: String,
        require: true
    },

    personalMail: {
        type: String,
    },

    phoneNumber: {
        type: Number,
        min: [9]
    },

    group: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'presentationGroups'
    }],

    school: {
        type: String,
        require: true
    },

    photo: {
        type: String,
        default: 'default_photo.jpg',
    },

    profileSummary: {
        type: String,
        maxlength: 500,
        select: false
    },

    workExperience: {
        type: String,
        maxlength: 500,
        select: false
    },

    researchInterests: {
        type: String,
        maxlength: 500,
        select: false
    },

    status: {
        full: {
            type: Boolean,
            default: false
        },
        notFull: {
            type: Boolean,
            default: true
        },
    },

    role: {
        type: String,
        default: 'teacher'
    },

    password: {
        type: String,
        require: [true, 'User must have a password'],
        min: [6, 'Password must be at least 6 characters'],
        max: [60, 'Password must not be more than 60 characters'],
        select: false
    },

    passwordConfirm: {
        type: String,
        require: [true, 'User must confirm password'],
        validate: {
            // This only works on create and save()
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not the same'
        },
    },

    passwordChangedAt: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

teacherDetailSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // delete passwordconfirm password field
    this.passwordConfirm = undefined;

    next();
});

teacherDetailSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const teacherDetail = mongoose.model('teacherDetail', teacherDetailSchema);

module.exports = teacherDetail;
