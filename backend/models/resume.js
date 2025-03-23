const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  extractedSkills: {
    type: [String],
    default: []
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const Resume = mongoose.model('Resume', ResumeSchema);

module.exports = Resume;