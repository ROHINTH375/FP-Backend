const mongoose = require('mongoose');
const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  jobTitle: { type: String, required: true },
  resumeLink: String,
  coverLetter: String,
  studentId: mongoose.Schema.Types.ObjectId,
    status: { type: String, enum: ["Applied", "Reviewed", "Rejected", "Selected", "Waiting"], default: "Applied" }
});
module.exports = mongoose.model('Application', ApplicationSchema);
