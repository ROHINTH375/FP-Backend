const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const recruitmentRoutes = require('./routes/recruitmentRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the auth routes
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes = require('./routes/companyRoutes');
const path = require('path');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const jobRoutes = require('./routes/jobRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const Student = require('./models/Student');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const placementRoutes = require('./routes/placementRoutes');
const Application = require('./models/Application');
const analyticsRoutes = require('./routes/analyticsRoutes');

const academicRoutes = require('./routes/academicRoutes');
dotenv.config();
connectDB();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/academic', academicRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/user', userRoutes);
app.use('/api', placementRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', recruitmentRoutes);
app.use(studentRoutes);
app.use('/api/company', companyRoutes);
// app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api', studentRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api', adminRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/jobs', jobRoutes);
app.post('/api/auth/register-student', async (req, res) => {
  try {
    // Your registration logic here (e.g., checking if student exists, hashing password, etc.)
    const student = new StudentModel(req.body);
    await student.save();
    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error registering student",
      error: error.message || error
    });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
      const { studentId, jobId, status } = req.body;

      // Validate the required fields
      if (!studentId || !jobId) {
          return res.status(400).json({ error: 'Student ID and Job ID are required' });
      }

      // Create a new application
      const newApplication = new Application({
          studentId,
          jobId,
          status: status || 'pending' // Default status is 'pending'
      });

      // Save the application to the database
      await newApplication.save();

      // Respond with the created application
      res.status(201).json(newApplication);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
      const { studentId, jobId, status } = req.body;

      // Validate the required fields
      if (!studentId || !jobId) {
          return res.status(400).json({ error: 'Student ID and Job ID are required' });
      }

      // Create a new application
      const newApplication = new Application({
          studentId,
          jobId,
          status: status || 'pending' // Default status is 'pending'
      });

      // Save the application to the database
      await newApplication.save();

      // Respond with the created application
      res.status(201).json(newApplication);
  } catch (error) {
      console.error('Error occurred while creating application:', error);

      // Check if it's a validation error or other type of error
      if (error.name === 'ValidationError') {
          return res.status(400).json({ error: error.message });
      }

      // For other types of errors, return a generic server error
      res.status(500).json({ error: 'Server error', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/student/dashboard-student', authMiddleware, async (req, res) => {
  try {
      const userId = req.user.id; // Get the authenticated user's ID from the middleware

      // Fetch the student data from the database using the userId
      const studentData = await Student.findById(userId);

      // Check if student data was found
      if (!studentData) {
          return res.status(404).json({ message: 'Student not found' });
      }

      // Send the student data as a response
      res.json({ success: true, data: studentData });
  } catch (error) {
      console.error("Error fetching student data:", error);
      res.status(500).json({ message: 'Server error while fetching student data' });
  }
});

app.get('/api/interviews/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const interviews = await Interview.find({ studentId });
    res.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/api/companies', (req, res) => {
  // Your code to retrieve and send back companies
  res.json({ message: "Companies retrieved successfully" });
});


// app.get('/api/user/profile', async (req, res) => {
//   const userId = req.user.id; // Replace with your authentication logic
//   try {
//     const user = await User.findById(userId);
//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// Test route
app.get('/api/test', (req, res) => {
res.status(200).json({ message: "Frontend and Backend are connected!" });
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder to serve the React frontend
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    // Catch-all route to serve React's index.html
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
  }
  // app.get('/api/your-protected-route', authMiddleware, (req, res) => {
  //   if (!req.user) {
  //     return res.status(401).json({ message: 'User not authenticated' });
  //   }
  //   const userId = req.user.id;
  //   res.send({ message: `User ID: ${userId}` });
  // });
  

//   app.get('/api/companies', (req, res) => {
//     // Your code to retrieve and send back companies
//     res.json({ message: "Companies retrieved successfully" });
// });

//   // Test route
// app.get('/api/test', (req, res) => {
//   res.status(200).json({ message: "Frontend and Backend are connected!" });
// });