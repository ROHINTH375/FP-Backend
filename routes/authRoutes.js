const express = require('express');
const { registerStudent,login } = require('../controllers/authController');
const router = express.Router();

// router.post('/register', registerStudent);
// router.post('/login', login);

router.post('/register-student', registerStudent);
// router.post('/register-company', registerCompany);
router.post('/login', login);


router.get('/test', (req, res) => {
    res.send('API is working');
  });
  
// router.post('/api/auth/register', registerStudent);
// router.post('/api/auth/login', login);


module.exports = router;
