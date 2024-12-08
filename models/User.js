const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  department: {
    type: String,
  },
  yearFrom: {
    type: Number,
  },
  yearTo: {
    type: Number,
  },
  district: {
    type: String,
  },
  achievements: {
    type: [String], // Array of strings
    default: [],
  },
  skills: {
    type: [String], // Array of strings
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
