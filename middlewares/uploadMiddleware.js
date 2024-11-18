const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Ensure the directory exists
const resumeUploadPath = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(resumeUploadPath)) {
  fs.mkdirSync(resumeUploadPath, { recursive: true });
}

// Configure Multer for storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resumeUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only PDFs and Word documents
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
  }
};

// Configure Multer with storage and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit to 2MB
});

module.exports = upload;
