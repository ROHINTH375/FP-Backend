const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: String,
    vacancies: Number,
    companyId: mongoose.Schema.Types.ObjectId,
    description: String,
    requirements: [String],
    applicationsReceived: { type: Number, default: 0 },
    applicationsRejected: { type: Number, default: 0 },
    applicationsSelected: { type: Number, default: 0 },
    status: { type: String, enum: ["Open", "Closed"], default: "Open" }
});

module.exports = mongoose.model('Job', jobSchema);
