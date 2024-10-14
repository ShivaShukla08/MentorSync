const mongoose = require('mongoose');
const { type } = require('os');
const { title } = require('process');

// Define the schema
const notificationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetail',
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const notification = mongoose.model('Notification', notificationSchema);

module.exports = notification;
