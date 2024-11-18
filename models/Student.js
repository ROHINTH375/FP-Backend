// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');

// // const StudentSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   resumeLink: String,
// //   coverLetter: String,
// //   academicDetails: {
// //     grade: String,
// //     achievements: String
// //   },
// // });
// // StudentSchema.pre('save', async function (next) {
// //   if (!this.isModified('password')) next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// // });
// // module.exports = mongoose.model('Student', StudentSchema);

// const mongoose = require('mongoose');

// // const studentSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   department: { type: String, required: true },
// //     year: { type: Number, required: true },
// // });

// const studentSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   academicRecord: String,
//   placementsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
// });

// module.exports = mongoose.model('Student', studentSchema);


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
