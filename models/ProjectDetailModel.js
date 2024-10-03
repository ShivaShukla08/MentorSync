const mongoose = require('mongoose');

const projectDetailSchema = new mongoose.Schema({
  project_id: {
    type: Number,
    required: true,
    unique: true,
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  project_title: {
    type: String,
    required: true,
    immutable: true 
  },
  links: {
    type: [String], // Array of links
    default: []
  },
  project_description: {
    type: String,
    required: true
  },
  project_techstack: {
    type: String,
    required: true
  }
});

const ProjectDetail = mongoose.model('ProjectDetail', projectDetailSchema);

module.exports = ProjectDetail;
