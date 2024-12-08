// models/PlacementDrive.js
const mongoose = require('mongoose');

const PlacementDriveSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  companiesParticipating: { type: [String], required: true },
});

module.exports = mongoose.model('PlacementDrive', PlacementDriveSchema);
