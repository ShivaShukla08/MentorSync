const mongoose = require("mongoose");
const validator = require("validator");

const studentDetailSchema = new mongoose.Schema({
  sapId: {
    type: String,
    require: [true, "Please enter your Id"],
    unique: true,
  },
  name: {
    type: String,
    required: true, // Corrected from 'require' to 'required'
    trim: true,
  },

  rollNo: {
    type: String,
    required: true, // Corrected from 'require' to 'required'
    unique: true,
    trim: true,
  },

  semester: {
    type: Number,
    min: [1, "Semester cannot be less than 1"],
    max: [9, "Semester cannot be greater than 9"],
    required: true, // Corrected from 'require' to 'required'
  },

  batch: {
    type: String,
    trim: true,
  },

  honors: {
    type: String,
    trim: true,
    enum: ["Honors", "Non-Honors"],
  },

  activityCoordinatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeacherDetail", // Ensuring the model name matches
  },

  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "presentationGroup",
    default: null,
  },

  courseDetail: {
    specialization: { type: String },
    stream: { type: String, required: true }, // Corrected from 'require' to 'required'
    courseName: { type: String, required: true }, // Corrected from 'require' to 'required'
  },

  courseDuration: {
    startDate: { type: Date, required: true }, // Corrected from 'require' to 'required'
    endDate: { type: Date, required: true }, // Corrected from 'require' to 'required'
  },

  contact: {
    email: {
      type: String,
      required: true, // Corrected from 'require' to 'required'
      unique: true,
      validate: {
        validator: function (v) {
          return /.+\@.+\..+/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    contactNo: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          // Check if the number has exactly 10 digits
          return /^\d{10}$/.test(v.toString());
        },
        message: "Please enter a valid 10-digit contact number",
      },
    }    
  },

  parentInformation: {
    name: {
      type: String,
      required: true, // Corrected from 'require' to 'required'
    },
    email: {
      type: String,
      required: false,
      unique: true, // Ensure uniqueness
      validate: {
        validator: function (v) {
          return /.+\@.+\..+/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    contactNo: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          // Check if the number has exactly 10 digits
          return /^\d{10}$/.test(v.toString());
        },
        message: "Please enter a valid 10-digit contact number",
      },
    }    
  },

  previousGroup: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "presentationGroup",
      required: false, // Not necessary, keep it optional
    },
  ],

  leaveGroup: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "presentationGroup",
    },
  ],

  skills: {
    type: [String],
    validate: {
      validator: function (v) {
        // Ensure array size <= 50 and each skill length <= 100
        return v.length <= 50 && v.every((skill) => skill.length <= 100);
      },
      message:
        "Skills can have up to 50 elements, each with a maximum length of 100 characters.",
    },
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Only allow valid gender values
    required: true, // Ensure that the gender field is mandatory
    validate: {
      validator: function (v) {
        return ["Male", "Female", "Other"].includes(v);
      },
      message: "Gender must be either Male, Female, or Other", // Error message if validation fails
    },
  },

  photo: {
    type: String,
    default: "default_photo.jpg",
  },
});

const StudentDetail = mongoose.model("StudentDetail", studentDetailSchema);

module.exports = StudentDetail;
