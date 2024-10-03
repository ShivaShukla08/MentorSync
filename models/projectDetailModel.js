const mongoose = require('mongoose');

const projectDetailSchema = new mongoose.Schema({
  projectId: {
    type: Number,
    required: true,
    unique: true,
  },
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
  links: {
    type: [String], // Array of links
    default: []
  },
  projectDescription: {
    type: String,
    required: true
  },
  projectTechStack: {
    type: String,
    required: true
  }
});

const ProjectDetail = mongoose.model('ProjectDetail', projectDetailSchema);

module.exports = ProjectDetail;
