const mongoose = require('mongoose');
const ApplicationSchema = new mongoose.Schema({
  // student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  // company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  // jobTitle: { type: String, required: true },
  // resumeLink: String,
  // coverLetter: String,
  // studentId: mongoose.Schema.Types.ObjectId,
  //   status: { type: String, enum: ["Applied", "Reviewed", "Rejected", "Selected", "Waiting"], default: "Applied" }
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { 
      type: String, 
      enum: ['pending', 'reviewed', 'rejected', 'selected', 'open'],  // Adding 'open' to the allowed values
      default: 'pending' 
  },
  description: { type: String, required: true },
  title: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  appliedDate: { type: Date, default: Date.now }
});
const Application = mongoose.model('Application',ApplicationSchema );

module.exports = Application;
