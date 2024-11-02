const express = require('express');
const { registerStudent,registerCompany, loginStudent, loginCompany,  registerAdmin, loginAdmin } = require('../controllers/authController');
const router = express.Router();

// router.post('/register', registerStudent);
// router.post('/login', login);

router.post('/register-student', registerStudent);
router.post('/register-company', registerCompany);
router.post('/login-student', loginStudent);
router.post('/login-company', loginCompany);

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
