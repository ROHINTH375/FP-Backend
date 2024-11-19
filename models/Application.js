const mongoose = require('mongoose');
const ApplicationSchema = new mongoose.Schema({
  // student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  // company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  // jobTitle: { type: String, required: true },
  // resumeLink: String,
  // coverLetter: String,
  // studentId: mongoose.Schema.Types.ObjectId,
  //   status: { type: String, enum: ["Applied", "Reviewed", "Rejected", "Selected", "Waiting"], default: "Applied" }
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
});
const Application = mongoose.model('Application',ApplicationSchema );

module.exports = Application;
