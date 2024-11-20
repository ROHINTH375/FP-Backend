const express = require('express');
const router = express.Router();
const { createApplication, getStudentApplications, getCompanyApplications ,applyForJob, getApplicationStatus, updateApplicationStatus} = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const applicationController = require('../controllers/applicationController');
const upload = require('../middlewares/uploadMiddleware');
const Application = require('../models/Application');

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
router.get('/applications', applicationController.getApplications);

// Submit application
router.post('/applications', authMiddleware, createApplication);
router.get('/applications', applicationController.getApplications);
router.post('/', applicationController.createApplication);

// GET: Get applications by Job ID
router.get('/job/:jobId', applicationController.getApplicationsByJobId);
// Fetch all applications for a student
router.get('/applications/:studentId', authMiddleware, getStudentApplications);
router.get('/applications', authMiddleware, async (req, res) => {
  try {
      const { studentId } = req.query;

      if (!studentId) {
          return res.status(400).json({ message: 'Student ID is required' });
      }

      const applications = await Application.find({ studentId })
          .populate('jobId', 'jobTitle')
          .populate('companyId', 'name');
      
      res.status(200).json(applications);
  } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch specific application status
router.get('/applications/status/:applicationId', authMiddleware, getApplicationStatus);

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
  router.get('/:id/academic-records', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const records = await AcademicRecord.find({ studentId: id });
    res.json(records);
  });
  
  router.get('/', authMiddleware, async (req, res) => {
    const { studentId } = req.query;
    const applications = await Application.find({ studentId });
    res.json(applications);
  });

  

  router.get('/applications', authMiddleware, async (req, res) => {
    try {
        const { studentId } = req.query;

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        }

        const applications = await Application.find({ studentId })
            .populate('jobId', 'jobTitle')
            .populate('companyId', 'name');
        
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
module.exports = router;
