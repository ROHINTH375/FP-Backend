// const Student = require('../models/Student');
// const Company = require('../models/Company');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

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


// const registerStudent = async (req, res) => {
//   try {
//     const { name, email, password, resumeLink, coverLetter } = req.body;

//     // Check if student already exists
//     let student = await Student.findOne({ email });
//     if (student) {
//       return res.status(400).json({ message: 'Student already exists' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create and save new student
//     student = new Student({
//       name,
//       email,
//       password: hashedPassword,
//       resumeLink,
//       coverLetter
//     });

//     await student.save();

//     res.status(201).json({ message: 'Student registered successfully' });

//   } catch (error) {
//     console.error('Error in registerStudent:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = { registerStudent };

// // Login student or company
// const login = async (req, res) => {
//   const { email, password, userType } = req.body;
//   try {
//     const user = userType === 'student' ? await Student.findOne({ email }) : await Company.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { registerStudent, login };

// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Company = require('../models/Company');
const Admin = require('../models/Admin');


const JWT_SECRET = process.env.JWT_SECRET || '654a1f8278382c4720453333ba283ed7d1fa43826869d213b27386f9d3288b31';  // Ensure to set this in your environment variables

// Register a new student
// exports.registerStudent = async (req, res) => {
//   console.log("Registering student:", req.body);
//   const { name, email, password } = req.body;

//   try {
//     // Check if the student already exists
//     const existingStudent = await Student.findOne({ email });
//     if (existingStudent) {
//       return res.status(400).json({ message: 'Student already registered with this email' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new student
//     const newStudent = new Student({
//       name,
//       email,
//       password: hashedPassword,
      
//     });

//     await newStudent.save();
//     res.status(201).json({ message: 'Student registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Student registration failed', error });
//   }
// };
exports.registerStudent = async (req, res) => {
  try {
    const { firstname, lastname, address, department, yearFrom, yearTo, district, pincode, phoneNumber, whatsappNumber, email, password, skills, createdAt } = req.body;
    // const resumePath = req.file.path; // Resume file path
    const student = new Student({ firstname, lastname, address, department, yearFrom, yearTo, district, pincode, phoneNumber, whatsappNumber, email, password, skills, createdAt});
    await student.save();
    res.status(201).json({ message: 'Student registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering student.' });
    console.log(error);
  }
};


// Register Admin
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering admin' });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in admin' });
  }
};

// Register a new company
exports.registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already registered with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new company
    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
    });

    await newCompany.save();
    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Company registration failed', error });
  }
};

// Login for student
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: student._id, role: 'student' }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Student login failed', error });
  }
};

// Login for company
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the company by email
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: 'Company not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: company._id, role: 'company' }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Company login failed', error });
  }
};

