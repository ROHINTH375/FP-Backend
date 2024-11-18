// models/PlacementDrive.js
const mongoose = require('mongoose');

const placementDriveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  description: { type: String },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
});

module.exports = mongoose.model('PlacementDrive', placementDriveSchema);
