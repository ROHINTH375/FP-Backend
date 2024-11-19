// models/Company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobPostings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', // Reference the Job model
    },
  ],
});

module.exports = mongoose.model('Company', companySchema);
