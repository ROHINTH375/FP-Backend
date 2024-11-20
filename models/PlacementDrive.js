// models/PlacementDrive.js
const mongoose = require('mongoose');

const placementDriveSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  companiesParticipating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
});

module.exports = mongoose.model('PlacementDrive', placementDriveSchema);
