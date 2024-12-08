const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the decoded token
    const user = await User.findById(userId).select('-password'); // Exclude sensitive fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
