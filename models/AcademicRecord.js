const mongoose = require('mongoose');

const academicRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  grades: { type: String, required: true }, // Example: "A, B, C"
  achievements: [String], // Array of achievements
  transcriptLink: { type: String }, // URL to a PDF of the transcript
  createdAt: { type: Date, default: Date.now },
});

const AcademicRecord = mongoose.model('AcademicRecord', academicRecordSchema);
module.exports = AcademicRecord;
