const express = require('express');
const mongoose = require('mongoose');
const { getStudentProfile, updateStudentProfile, getStudentDashboard } = require('../controllers/studentController');
const studentController = require('../controllers/studentController');
const router = express.Router();
const { registerStudent, loginStudent,getDashboardData, getStudentData } = require('../controllers/studentController');
const Student = require('../models/Student');
const authMiddleware = require('../middlewares/authMiddleware');
// const authenticateToken = require('../middlewares/authenticateToken')

router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students.' });
  }
});

// router.get('/dashboard-student',authenticateToken,  async (req, res) => {
//   try {
//     const studentId = req.user.id; // Extract student ID from token
//     const student = await Student.findById(studentId);

//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     res.json(student);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// router.get('/student/dashboard-student', authMiddleware, async (req, res) => {
//   try {
//       const userId = req.user.id; // Authenticated user ID from middleware

//       // Validate userId
//       if (!mongoose.Types.ObjectId.isValid(userId)) {
//           return res.status(400).json({ success: false, message: 'Invalid user ID format' });
//       }

//       // Fetch the student data
//       const studentData = await Student.findById(userId);

//       if (!studentData) {
//           return res.status(404).json({ success: false, message: 'Student not found' });
//       }

//       // Optionally fetch related data
//       const applications = await Application.find({ studentId: userId });
//       const jobs = await Job.find();

//       // Respond with data
//       res.status(200).json({
//           success: true,
//           data: {
//               student: studentData,
//               applications,
//               jobs,
//           },
//       });
//   } catch (error) {
//       console.error("Error fetching student data:", error.message);
//       res.status(500).json({ success: false, message: 'Server error while fetching student data' });
//   }
// });

router.get('/dashboard-student', authMiddleware, getStudentDashboard);
router.post('/register-student', registerStudent);
// router.get('/dashboard-student', getStudentData);

router.get('/dashboard', getStudentData);
// router.get('/dashboard-student', authMiddleware);
router.get('/student/dashboard-student', authMiddleware, async (req, res) => {
  console.log("Request received at /student/dashboard-student");
  try {
      const userId = req.user.id; // Extract user ID from the middleware

      // Validate userId format
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ success: false, message: 'Invalid user ID format' });
      }

      // Fetch the student data from the database
      const studentData = await Student.findById(userId);

      if (!studentData) {
          return res.status(404).json({ success: false, message: 'Student not found' });
      }

      // Respond with the student data
      res.status(200).json({ success: true, data: studentData });
  } catch (error) {
      console.error("Error fetching student data:", error.message);
      res.status(500).json({ success: false, message: 'Server error while fetching student data' });
  }
});
router.post('/login-student', loginStudent);
router.get('/api/your-protected-route', authMiddleware, (req, res) => {
  res.send("This is a protected route!");
});
router.get('/dashboard',getDashboardData);
module.exports = router;
