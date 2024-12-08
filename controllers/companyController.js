const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Job = require('../models/Job');
const Application = require('../models/Application');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
// Register a new company
exports.registerCompany = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    // Check if the company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new company
    const company = new Company({
      name,
      email,
      password: hashedPassword,
      location,
    });

    await company.save();
    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering company', error });
  }
};

// Login a company
// controllers/companyController.js
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: company._id, role: 'company' }, // Include company ID and role in the token payload
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    console.log('Generated Token:', token);

    res.status(200).json({
      message: 'Login successful',
      token,
      company: {
        id: company._id,
        name: company.name,
        email: company.email,
      },
    });
  } catch (error) {
    console.error('Error logging in company:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getAllCompanies = async (req, res) => {
        try {
            const companies = await Company.find();
            res.status(200).json(companies);
        } catch (error) {
            console.error('Error in getAllCompanies:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Post a new job
    exports.postJob = async (req, res) => {
      try {
        const { jobTitle, jobDescription, requirements } = req.body; // Destructure required fields
    
        // Validate the request body
        if (!jobTitle || !jobDescription || !requirements) {
          return res.status(400).json({ message: 'jobTitle and jobDescription are required' });
        }
    
        // Create and save the job
        const job = new Job({
          companyId: req.user.id,
          jobTitle,
          jobDescription,
          requirements,
        });
    
        await job.save();
    
        res.status(201).json({ message: 'Job posted successfully', job });
      } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
    };

// Fetch jobs posted by the company
exports.getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.user.id;
    const jobs = await Job.find({ companyId });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch applications for a specific job
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId }).populate('studentId', 'firstname lastname email skills');
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Selected', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application status updated successfully', application: updatedApplication });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCompanyDashboard = async (req, res) => {
  try {
    const companyId = req.user.companyId; // Assume `req.user` contains the company ID from the token
    // Fetch company dashboard data (e.g., metrics, stats, etc.)
    const dashboardData = {
      totalEmployees: 120,
      activeProjects: 15,
      revenue: 500000,
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching company dashboard:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

// module.exports = { getCompanyDashboard };


