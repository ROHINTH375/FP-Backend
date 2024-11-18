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
const upload = require('../middlewares/uploadMiddleware');
// Route to create a new application (protected route)
// router.post('/create', authMiddleware, createApplication);
// Route for submitting an application with a resume
router.post('/create', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    const { studentId, jobId, coverLetter } = req.body;
    const resumePath = req.file ? req.file.path : null;

    if (!studentId || !jobId) {
      return res.status(400).json({ message: 'Student ID and Job ID are required.' });
    }

    // Call your application creation logic
    const application = await createApplication({
      studentId,
      jobId,
      coverLetter,
      resumePath,
    });

    res.status(201).json({ message: 'Application submitted successfully!', application });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Route to get all applications for a specific student (protected route)
router.get('/student/:studentId', authMiddleware, getStudentApplications);

// Route to get all applications for a specific company (protected route)
router.get('/company/:companyId', authMiddleware, getCompanyApplications);

router.post('/apply', applyForJob);
// Route to get application status
router.get('/api/applications/:applicationId/status', getApplicationStatus);

// Route to update application status
router.put('/api/applications/:applicationId/status', updateApplicationStatus);
router.get('/:studentId', async (req, res) => {
    try {
      const applications = await Application.find({ studentId: req.params.studentId }).populate('jobId');
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching applications.' });
    }
  });

module.exports = router;
