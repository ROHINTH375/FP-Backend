// // middlewares/authMiddleware.js

// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(403).json({ message: 'Token is required' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;
 
// middlewares/authMiddleware.js

// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   // Check if Authorization header exists and has a token
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     console.log("Authorization header missing");
//     return res.status(403).json({ message: 'Token is required' });
// }

//   const token = authHeader.split(' ')[1];
//   if (!token) {
//     console.log("Token missing");
//     return res.status(403).json({ message: 'Token is required' });
// }

//   try {
//     // Verify the token and set the decoded user data in req.user
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded JWT:', decoded);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log("Token verification failed:", error);
//     // Send a detailed message if the token is expired or invalid
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Save resumes in the `uploads/` folder


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
