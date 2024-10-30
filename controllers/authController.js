const Student = require('../models/Student');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register student
// const registerStudent = async (req, res) => {
//   console.log('Register student hit');
//   // const { name, email, password, resumeLink, coverLetter } = req.body;

//   try {
//     const { name, email, password, resumeLink, coverLetter } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const student = new Student({ name, email, password: hashedPassword });
//     await student.save();

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(201).json({ token });
//     res.status(201).json({ message: 'Student registered successfully' });
//   } catch (err) {
//     console.error('Error in registerStudent:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const registerStudent = async (req, res) => {
  try {
    const { name, email, password, resumeLink, coverLetter } = req.body;

    // Check if student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new student
    student = new Student({
      name,
      email,
      password: hashedPassword,
      resumeLink,
      coverLetter
    });

    await student.save();

    res.status(201).json({ message: 'Student registered successfully' });

  } catch (error) {
    console.error('Error in registerStudent:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerStudent };

// Login student or company
const login = async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    const user = userType === 'student' ? await Student.findOne({ email }) : await Company.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerStudent, login };
