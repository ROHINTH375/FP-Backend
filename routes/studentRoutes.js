const express = require('express');
const { getStudentProfile, updateStudentProfile, getStudentDashboard } = require('../controllers/studentController');
const studentController = require('../controllers/studentController');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
const { registerStudent, loginStudent,getDashboardData, getStudentData } = require('../controllers/studentController');
const Student = require('../models/Student');
const authMiddleware = require('../middlewares/authMiddleware');

// const auth = require('../middleware/authMiddleware');
// Student profile routes
// router.get('/profile', authMiddleware, getStudentProfile);
// router.put('/profile', authMiddleware, updateStudentProfile);
// In routes/studentRoutes.js
// router.post('/register', studentController.registerStudent);

// // Register a new student
// router.post('/register-student', studentController.registerStudent);

// // Get all students
// router.get('/students', studentController.getAllStudents);

// // Get a single student by ID
// router.get('/students/:id', studentController.getStudentById);

// // Update student details by ID
// router.put('/students/:id', studentController.updateStudent);

// // Delete a student by ID
// router.delete('/students/:id', studentController.deleteStudent);

// Register Student
// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newStudent = new Student({
//             name,
//             email,
//             password: hashedPassword
//         });

//         await newStudent.save();
//         res.status(201).json({ message: 'Student registered successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Student registration failed' });
//     }
// });
router.post('/register-student', registerStudent);
router.get('/dashboard-student', getStudentData);
router.get('/dashboard', getStudentData);
router.get('/dashboard-student', authMiddleware);
router.post('/login-student', loginStudent);
// router.post('/students', studentController.createStudent);
// Student Login
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const student = await Student.findOne({ email });

//         if (!student || !(await bcrypt.compare(password, student.password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: student._id }, 'your_jwt_secret');
//         res.json({ message: 'Login successful', token });
//     } catch (error) {
//         res.status(500).json({ message: 'Login failed' });
//     }
// });
router.get('/api/your-protected-route', authMiddleware, (req, res) => {
  res.send("This is a protected route!");
});
// router.post('/login', loginStudent);
router.get('/dashboard',getDashboardData);
module.exports = router;
