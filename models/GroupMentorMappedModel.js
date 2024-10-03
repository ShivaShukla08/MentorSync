const mongoose = require("mongoose");

const groupMentorSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "presentationGroup",
    required: [true, "Group id is required"],
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacherDetail",
    required: [true, "Teacher id is required"],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectDetail",
    required: [true, "Project id is required"],
  },
});

const groupMentorDetails = mongoose.model(
  "groupMentorDetails",
  groupMentorSchema
);

module.exports = groupMentorDetails;
