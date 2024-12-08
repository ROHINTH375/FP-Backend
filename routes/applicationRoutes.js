const express = require('express');
const router = express.Router();
const { createApplication, getStudentApplications, getCompanyApplications ,applyForJob, getApplicationStatus, updateApplicationStatus} = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const applicationController = require('../controllers/applicationController');
const upload = require('../middlewares/uploadMiddleware');
const Application = require('../models/Application');
const Job = require('../models/Job');
const mongoose = require('mongoose');

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
// router.get('/applications', applicationController.getApplications);
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
router.get('/student/:studentId', authMiddleware, async (req, res) => {
  try {
    const { studentId } = req.params;
    const applications = await Application.find({ studentId })
      .populate('jobId', 'jobTitle')
      .populate('companyId', 'name');

    res.status(200).json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all applications for a specific company (protected route)
router.get('/company/:companyId', authMiddleware, getCompanyApplications);
router.post('/apply', authMiddleware, applyForJob);
// POST: Apply for a job
router.post('/apply', authMiddleware, async (req, res) => {
  try {
    const { studentId, jobId, companyId, resume, coverLetter } = req.body;

    if (!studentId || !jobId || !companyId || !resume) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the student has already applied for the job
    const existingApplication = await Application.findOne({ studentId, jobId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      studentId,
      jobId,
      companyId,
      resume,
      coverLetter,
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Error applying for the job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
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

  // router.post('/applications/apply', authMiddleware, async (req, res) => {
  //   try {
  //     const { studentId, jobId, coverLetter, resume } = req.body;
  
  //     // Ensure the required fields are provided
  //     if (!studentId || !jobId ) {
  //       return res.status(400).json({ message: 'Student ID and Job ID are required' });
  //     }
  
  //     // Create a new application
  //     const newApplication = new Application({
  //       studentId,
  //       jobId,
  //       coverLetter,
  //       resume, // If storing the resume as a file, ensure it's processed properly
  //     });
  
  //     await newApplication.save();
  //     res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  //   } catch (error) {
  //     console.error('Error applying for job:', error);
  //     res.status(500).json({ message: 'Server error while applying for job' });
  //   }
  // });


  // routes/applicationRoutes.js

router.post('/applications/apply', authMiddleware, async (req, res) => {
  try {
    const { studentId, jobId, coverLetter, resume } = req.body;

    // Validate the required fields
    if (!studentId || !jobId) {
      return res.status(400).json({ message: 'Student ID and Job ID are required' });
    }

    // Create a new application
    const newApplication = new Application({
      studentId,
      jobId,
      coverLetter,
      resume,
      status: 'pending', // Default status
    });

    await newApplication.save();

    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Server error while applying for job' });
  }
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

// router.get('/applications/job/:jobId', authMiddleware, async (req, res) => {
//   try {
//     const { jobId } = req.params;

//     // Ensure the job exists
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: 'Job not found' });
//     }

//     // Fetch applications for the job
//     const applications = await Application.find({ jobId })
//       .populate('studentId', 'firstname lastname email')
//       .populate('jobId', 'title')
//       .populate('companyId', 'name');

//     res.status(200).json({ applications });
//   } catch (error) {
//     console.error('Error fetching applications:', error.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
router.get('/applications/job/:jobId', authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate jobId format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ error: 'Invalid jobId format' });
    }

    // Ensure the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Fetch applications for the job
    const applications = await Application.find({ jobId })
      .populate('studentId', 'firstname lastname email')
      .populate('jobId', 'title')
      .populate('companyId', 'name');

    res.status(200).json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error.message);
    res.status(500).json({ error: 'Error fetching applications', details: error });
  }
});

module.exports = router;
