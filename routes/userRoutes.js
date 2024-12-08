// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const { getUserProfile } = require('../controllers/userController');
// Define the /profile route within the user routes
// router.get('/profile', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user.id; // Assumes authMiddleware sets req.user
//         if (!userId) {
//           return res.status(400).json({ message: 'User ID is required' });
//         }
    
//         const user = await User.findById(userId).select('-password'); // Exclude password from the response
//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }
    
//         res.status(200).json(user);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//         res.status(500).json({ message: 'Internal server error' });
//       }
//     });

router.get('/user/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `authMiddleware` attaches the user ID to `req.user`
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
