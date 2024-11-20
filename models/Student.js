
// models/Student.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the student schema
const studentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  department: { type: String, required: true },
  yearFrom: { type: String, required: true },
  yearTo: { type: String, required: true },
  district: { type: String, required: true },
  pincode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  whatsappNumber: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving (optional, for security)
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
