const express = require('express');
const router = express.Router();
// const adminController = require('../controllers/adminController');
const { loginAdmin, registerAdmin } = require('../controllers/adminController'); // Adjust the path as needed
const authMiddleware = require('../middlewares/authMiddleware');
// Admin registration route
// router.post('/register-admin', adminController.registerAdmin);
router.post('/admin-login', loginAdmin);
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login request received');

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  } catch (error) {
    console.error('Error in admin login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
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
router.post('/register-admin', registerAdmin);
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
