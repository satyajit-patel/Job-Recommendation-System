const Resume = require('../models/Resume'); // Resume
const User = require('../models/User');
const fs = require('fs');
const { processResume } = require('../utils/resumeProcessor');
const { fetchJobRecommendations } = require('../utils/jobScraper');

// Upload and process resume
exports.uploadAndProcess = async (req, res) => {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    const userId = req.user.id;
    const resumeFile = req.file;
    console.log(resumeFile);
    
    const fileUrl = resumeFile.filename;
    
    // Extract skills from resume
    const extractedSkills = await processResume(resumeFile.path);
    
    // Save resume information to database
    const resume = new Resume({
      userId,
      filename: resumeFile.originalname,
      fileUrl,
      extractedSkills
    });
    
    await resume.save();
    
    // Update user's skills
    await User.findByIdAndUpdate(userId, { skills: extractedSkills });
    
    // Get jobs based on skills
    const jobs = await fetchJobRecommendations(extractedSkills);
    
    res.status(200).json({
      skills: extractedSkills,
      jobs,
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    // Remove uploaded file in case of error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message || 'Error processing resume' });
  }
};