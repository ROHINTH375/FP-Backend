const mongoose = require('mongoose');
const ApplicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'reviewed', 'rejected', 'selected'], 
    default: 'pending' 
  },
  appliedDate: { type: Date, default: Date.now },
  resume: { type: String, required: true },
  coverLetter: { type: String },
});
const Application = mongoose.model('Application',ApplicationSchema );

module.exports = Application;
