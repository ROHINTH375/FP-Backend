const express = require('express');
const router = express.Router();
// const adminController = require('../controllers/adminController');
const { loginAdmin, registerAdmin } = require('../controllers/adminController'); // Adjust the path as needed
// Admin registration route
// router.post('/register-admin', adminController.registerAdmin);
router.post('/admin-login', loginAdmin);
router.post('/admin/register', async (req, res) => {
    try {
        // Assuming you're using Mongoose for MongoDB
        const newAdmin = new Admin({
            username: req.body.username,
            password: req.body.password,
            // other fields as needed
        });

        // Save the admin to the database
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/content', async (req, res) => {
    try {
      // Replace with actual content-fetching logic from your database
      const content = await ContentModel.find();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content." });
    }
  });
module.exports = router;
