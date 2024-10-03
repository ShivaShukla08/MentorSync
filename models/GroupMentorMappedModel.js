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
    required: [true, "teacher id is required"],
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectDetail",
    required: [true, "Porject id is required"],
  },
});

const groupMentorDetails = mongoose.model(
  "groupMentorDetails",
  groupMentorSchema
);

module.exports = groupMentorDetails;
