const mongoose = require('mongoose');

const projectDetailSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  projectTitle: {
    type: String,
    required: true,
    immutable: true
  },
  links: [
    {
      name: {
        type: String,
        required: false
      },
      link: {
        type: String,
        required: false
      }
    }
  ],
  projectDescription: {
    type: String,
    required: false
  },
  projectTechStack: {
    type: [
      {
        technologyName: {
          type: String,
          required: true
        },
        value: {
          type: [String], // Array of strings for versions
          required: false,
          default: []
        }
      }
    ], // Array of objects with technologyName and versionsUsed
    validate: {
      validator: function (val) {
        return val.length <= 500; // Validate array size
      },
      message: 'The projectTechStack can contain a maximum of 500 technologies.'
    },
    required: true
  }
});

const ProjectDetail = mongoose.model('ProjectDetail', projectDetailSchema);

module.exports = ProjectDetail;
