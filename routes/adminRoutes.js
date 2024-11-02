const express = require('express');
const router = express.Router();
// const adminController = require('../controllers/adminController');
const { loginAdmin, registerAdmin } = require('../controllers/adminController'); // Adjust the path as needed
// Admin registration route
// router.post('/register-admin', adminController.registerAdmin);
router.post('/admin-login', loginAdmin);
router.post('/admin-login', registerAdmin);
module.exports = router;
