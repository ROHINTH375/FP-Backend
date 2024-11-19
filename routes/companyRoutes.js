const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');  // Import the companyController
const authMiddleware = require('../middlewares/authMiddleware');
const { registerCompany, loginCompany } = require('../controllers/companyController');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');

const bcrypt = require('bcryptjs');
const { postJob, getCompanyJobs, getJobApplications, updateApplicationStatus } = require('../controllers/companyController');

// Register Company
router.post('/register-company', registerCompany);
// router.get('/dashboard', authMiddleware, async (req, res) => {
//   try {
//     const companyId = req.user.id; // Assuming the token contains the company ID

//     // Fetch job postings
//     const jobs = await Job.find({ companyId }).populate('applications');

//     res.status(200).json({ jobs });
//   } catch (error) {
//     console.error('Error fetching company dashboard:', error);
//     res.status(500).json({ message: 'Failed to fetch dashboard data.' });
//   }
// });
router.post('/login-company', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the company exists
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    // Additional logic for password validation and response goes here
  } catch (error) {
    console.error('Error logging in company:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/companies', async (req, res) => {
  try {
      const companies = await Company.find(); // Fetch all companies from the database
      res.json(companies);
  } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ message: "Server error" });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required.' });
    }

    const newCompany = new Company({ name, description });
    await newCompany.save();
    res.status(201).json({ message: 'Company registered successfully.' });
  } catch (error) {
    console.error('Error registering company:', error);
    res.status(500).json({ error: 'An error occurred while registering the company.' });
  }
});
// Post a new job
router.post('/post-job', authMiddleware, postJob);

// Fetch jobs posted by the company
router.get('/jobs', authMiddleware, getCompanyJobs);

// Fetch applications for a specific job
router.get('/job-applications/:jobId', authMiddleware, getJobApplications);

// Update application status
router.put('/update-application-status/:applicationId', authMiddleware, updateApplicationStatus);
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const company = await Company.findOne({ email });
//         if (!company) return res.status(400).json({ message: "Invalid email or password." });
//         const isMatch = await bcrypt.compare(password, company.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });
        
//         const token = jwt.sign({ id: company._id }, 'your_jwt_secret', { expiresIn: '1h' });
//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Login failed. Please try again." });
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const companies = await Company.find();
//         if (!companies) {
//             return res.status(404).json({ message: "No companies found." });
//         }
//         res.status(200).json(companies);
//     } catch (error) {
//         console.error("Error fetching companies:", error.message);
//         res.status(500).json({ message: "Error fetching companies.", error: error.message });
//     }
// });

// // Company Registration
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         // Check if company already exists
//         const existingCompany = await Company.findOne({ email });
//         if (existingCompany) {
//             return res.status(400).json({ message: 'Company already exists.' });
//         }

//         // Create new company
//         const newCompany = new Company({ name, email, password }); // Make sure to hash the password in a real application
//         await newCompany.save();
//         res.status(201).json({ message: 'Company registered successfully.' });
//     } catch (error) {
//         console.error('Registration error:', error);
//         res.status(500).json({ message: 'Registration failed. Please try again.' });
//     }
// });

// Company Login
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const company = await Company.findOne({ email });

//         if (!company || !(await bcrypt.compare(password, company.password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: company._id }, 'your_jwt_secret');
//         res.json({ message: 'Login successful', token });
//     } catch (error) {
//         res.status(500).json({ message: 'Login failed' });
//     }
// });

router.get('/protected-route', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
  });

  router.get('/dashboard-company', authMiddleware, async (req, res) => {
    try {
      const companyId = req.user.id; // Ensure this comes from the decoded token
      const company = await Company.findById(companyId).populate('jobPostings');
  
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Fetch jobs and applications
    const jobs = await Job.find({ companyId }).populate('applications');

    return res.status(200).json({
      company: {
        id: company._id,
        name: company.name,
        email: company.email,
      },
      jobs,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error.message);
    return res.status(500).json({ message: 'Server error', error });
  }
});
  
module.exports = router;
