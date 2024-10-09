const mongoose = require("mongoose");

const requestTableSchema = new mongoose.Schema({
  ///0 means student to group and 1 means group to student
  type: {
    type: String,
    enum: ["0", "1"],
    required: true,
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentdetails",
    required: true,
  },

  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "presentationgroup",
    required: true,
  },

  createdAt: {
    type: Date,
    date: Date.now(),
  },

  Rollback: {
    type: Boolean,
    default: false,
  },

  accept1: {
    type: String,
    enum: ["pending", "accept", "reject"],
    default: "pending",
  },

  accept2: {
    type: String,
    enum: ["pending", "accept", "reject"],
    default: "pending",
  },

  note: {
    type: String,
    default: "",
  },

  validity: {
    first: {
      type: Boolean,
      required: true,
    },
    second: {
      type: Boolean,
      required: true,
    },
  },

  leave: {
    type: Boolean,
    default: false,
  },

  rejectMessage: {
    type: String,
    maxlength: 100,
    default: "",
  },
});

const RequestTable = mongoose.model(
  "requestTableGroupAndStudent",
  requestTableSchema
);

module.exports = RequestTable;
