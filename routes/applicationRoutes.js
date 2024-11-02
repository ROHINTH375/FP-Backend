// const express = require('express');
// const { submitApplication, getApplications } = require('../controllers/applicationController');
// const auth = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.post('/submit', auth, submitApplication);
// router.get('/student', auth, getApplications);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { createApplication, getStudentApplications, getCompanyApplications ,applyForJob, getApplicationStatus, updateApplicationStatus} = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to create a new application (protected route)
router.post('/create', authMiddleware, createApplication);

// Route to get all applications for a specific student (protected route)
router.get('/student/:studentId', authMiddleware, getStudentApplications);

// Route to get all applications for a specific company (protected route)
router.get('/company/:companyId', authMiddleware, getCompanyApplications);

router.post('/apply', applyForJob);
// Route to get application status
router.get('/api/applications/:applicationId/status', getApplicationStatus);

// Route to update application status
router.put('/api/applications/:applicationId/status', updateApplicationStatus);

module.exports = router;
