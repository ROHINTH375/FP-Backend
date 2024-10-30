// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const StudentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   resumeLink: String,
//   coverLetter: String,
//   academicDetails: {
//     grade: String,
//     achievements: String
//   },
// });
// StudentSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
// module.exports = mongoose.model('Student', StudentSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: String,
  year: String,
});

module.exports = mongoose.model('Student', studentSchema);