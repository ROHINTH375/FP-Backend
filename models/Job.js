const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//     jobTitle: String,
//     vacancies: Number,
//     companyId: mongoose.Schema.Types.ObjectId,
//     description: String,
//     requirements: [String],
//     applicationsReceived: { type: Number, default: 0 },
//     applicationsRejected: { type: Number, default: 0 },
//     applicationsSelected: { type: Number, default: 0 },
//     status: { type: String, enum: ["Open", "Closed"], default: "Open" }
// });

const jobSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    requirements: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
