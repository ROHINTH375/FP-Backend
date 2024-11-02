const Admin = require('../models/Admin'); // Assuming you have an Admin model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For creating tokens
// exports.registerAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Input validation
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
//     }

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin already exists' });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new admin
//     const newAdmin = new Admin({ email, password: hashedPassword });
//     await newAdmin.save();

//     res.status(201).json({ message: 'Admin registered successfully' });
//   } catch (error) {
//     console.error('Error registering admin:', error); // Log error details for debugging
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// exports.loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//     try {
//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//             return res.status(404).json({ error: 'Admin not found' });
//         }

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(401).json({ error: 'Invalid password' });
//         }

//         const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
//         res.status(200).json({ message: 'Login successful', admin: { id: admin._id, email: admin.email }, token });
//     } catch (error) {
//         console.error('Error logging in admin:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Successful login (You can implement JWT here if needed)
    res.status(200).json({ message: 'Admin logged in successfully', adminId: admin._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};