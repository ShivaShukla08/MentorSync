const mongoose = require('mongoose');

// Define the schema
const notificationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetail',
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 600,
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
