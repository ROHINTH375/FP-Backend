// // models/Interview.js
// const mongoose = require('mongoose');

// const interviewSchema = new mongoose.Schema({
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
//   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
//   jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
//   interviewDate: { type: Date, required: true },
//   interviewFormat: { type: String, enum: ['in-person', 'virtual'], default: 'virtual' },
//   zoomLink: { type: String },
//   status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' }
// });

// module.exports = mongoose.model('Interview', interviewSchema);

const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    interviewDate: { type: Date, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId,  required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId,  required: true }
});

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview; // Make sure to export the model