const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User must have an ID'],
    unique: true,
    trim: true,
  },

  role: {
    type: String,
    enum: ['teacher', 'student', 'admin'],
    required: true,
  },

  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    maxlength: [60, 'Password must not be more than 60 characters'],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'User must confirm the password'],
    validate: {
      // This only works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },

  passwordChangedAt: {
    type: Date,
  },

  resetPasswordToken: {
    type: String,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  prevPasswords: {
    type: [String], // Array of strings for previous passwords
    select: false,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Remove passwordConfirm field after validation
  this.passwordConfirm = undefined;
  next();
});

// Check if the provided password matches the hashed password
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const UserDetail = mongoose.model('UserDetail', userSchema);

module.exports = UserDetail;
