const mongoose = require('mongoose');

const RecruitmentStatSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RecruitmentStat', RecruitmentStatSchema);
