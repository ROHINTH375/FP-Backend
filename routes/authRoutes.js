const express = require('express');
const { registerStudent,registerCompany, loginStudent, loginCompany,  registerAdmin, loginAdmin } = require('../controllers/authController');
const router = express.Router();
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
// router.post('/register', registerStudent);
// router.post('/login', login);

router.post('/register-student', registerStudent);
router.post('/register-company', registerCompany);
router.post('/login-student', loginStudent);
router.post('/login-company', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
  }

  // Add logic to verify the company credentials here
  // For example:
  const company = await Company.findOne({ email });
  if (!company || !(await bcrypt.compare(password, company.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate and return a token or success response
  res.status(200).json({ message: 'Login successful', token: 'your-jwt-token' });
  res.json({ message: 'Login successful', companyId: company._id });

});

// Register Admin
router.post('/register-admin', registerAdmin);

// Login Admin
router.post('/admin-login', loginAdmin);
// router.post('/register-admin', registerAdmin);
router.get('/test', (req, res) => {
    res.send('API is working');
  });
  
// router.post('/api/auth/register', registerStudent);
// router.post('/api/auth/login', login);


module.exports = router;
