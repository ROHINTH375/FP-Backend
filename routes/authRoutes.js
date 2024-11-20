const express = require('express');
const { registerStudent,registerCompany, loginStudent, loginCompany,  registerAdmin, loginAdmin } = require('../controllers/authController');
const router = express.Router();
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); // Adjust the path as needed
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Save resumes in the `uploads/` folder

router.post('/api/refresh-token', (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token required' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // New short-lived access token
    );

    res.json({ token: newToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});
router.post('/register-company', registerCompany);
router.post('/login-student', loginStudent);
// router.post('/login-company', async (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//   }

//   // Add logic to verify the company credentials here
//   // For example:
//   const company = await Company.findOne({ email });
//   if (!company || !(await bcrypt.compare(password, company.password))) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   // Generate and return a token or success response
//   res.status(200).json({ message: 'Login successful', token: 'your-jwt-token' });
//   res.json({ message: 'Login successful', companyId: company._id });

// });

// Register Admin
router.post('/register-admin', registerAdmin);
router.post('/login-company', loginCompany);
//Register Student
router.post('/register-student', registerStudent);



// Login Admin
router.post('/admin-login', loginAdmin);

router.get('/test', (req, res) => {
    res.send('API is working');
  });



module.exports = router;
