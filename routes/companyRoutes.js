const express = require('express');
// const { getCompanyProfile, postJob } = require('../controllers/companyController');
const router = express.Router();
const companyController = require('../controllers/companyController');  // Import the companyController
const authMiddleware = require('../middlewares/authMiddleware');
const { registerCompany, loginCompany } = require('../controllers/companyController');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const { getAllCompanies } = require('../controllers/companyController');

// Company profile routes
// router.get('/profile', authMiddleware, getCompanyProfile);
// router.post('/job', authMiddleware, postJob);
// router.post('/companies', companyController.createCompany);

// // Company Registration Endpoint
// router.post('/register', companyController.registerCompany);

// // Get all companies
// router.get('/api/companies', companyController.getAllCompanies);

// // Get a single company by ID
// router.get('/companies/:id', companyController.getCompanyById);

// // Update company details by ID
// router.put('/companies/:id', companyController.updateCompany);

// // Delete a company by ID
// router.delete('/companies/:id', companyController.deleteCompany);

// Register Company
router.post('/register-company', registerCompany);
router.post('/login', loginCompany);
router.get('/companies', getAllCompanies);

// Login Company
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

  
module.exports = router;
