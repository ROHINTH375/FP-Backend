const express = require('express');
const router = express.Router();
// const companyController = require('../controllers/companyController');  // Import the companyController
const authMiddleware = require('../middlewares/authMiddleware');
const { registerCompany, loginCompany,getAllCompanies } = require('../controllers/companyController');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { getCompanyDashboard } = require('../controllers/companyController');

const bcrypt = require('bcryptjs');
const { postJob, getCompanyJobs, getJobApplications, updateApplicationStatus } = require('../controllers/companyController');

// Register Company
router.post('/register-company', registerCompany);

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
router.get('/companies', getAllCompanies);
router.get('/', getAllCompanies);
// router.get('/companies', async (req, res) => {
//   try {
//       const companies = await Company.find(); // Fetch all companies from the database
//       res.json(companies);
//   } catch (error) {
//       console.error("Error fetching companies:", error);
//       res.status(500).json({ message: "Server error" });
//   }
// });

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

router.post('/post-job', authMiddleware, async (req, res) => {
  try {
    const { jobTitle, jobDescription, requirements, companyId } = req.body;

    if (!jobTitle || !jobDescription || !requirements || !companyId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newJob = new Job({
      jobTitle,
      jobDescription,
      requirements,
      companyId,
    });

    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully!', job: newJob });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch jobs posted by the company
router.get('/jobs', authMiddleware, getCompanyJobs);

// Fetch applications for a specific job
router.get('/job-applications/:jobId', authMiddleware, getJobApplications);

// Update application status
router.put('/update-application-status/:applicationId', authMiddleware, updateApplicationStatus);

router.get('/protected-route', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
  });

  router.get('/dashboard', authMiddleware, getCompanyDashboard);

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
