const mongoose = require('mongoose');

const notificationTrackerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetail',
    required: true,
  },
  notifications: [
    {
      notificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
        required: true,
      },
      isread: {
        type: Boolean,
        default: false,
      },
      markAsImportant: {
        type: Boolean,
        default: false,
      },
      deleted:{
        type: Date,
        default: null,
      },
      _id: false
    },
  ],
});

// Create and export the model
const notificationTracker = mongoose.model('notificationTracker', notificationTrackerSchema);

module.exports = notificationTracker;
