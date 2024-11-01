const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin registration route
router.post('/register-admin', adminController.registerAdmin);

module.exports = router;
