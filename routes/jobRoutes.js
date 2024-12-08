const express = require('express');
const { createJob, getJobDetails, updateJobStatus } = require('../controllers/jobController');
const router = express.Router();
const Job = require('../models/Job'); // Assuming you have a Job model
const Application = require('../models/Application');
const multer = require("multer");
const { postJob } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');
router.post('/job/post', postJob);
const Student = require('../models/Student');
const upload = multer({ dest: 'uploads/' });
// GET /api/jobs/applications/:jobId - Get applications for a specific job
router.get('/applications/:jobId', async (req, res) => {
    try {
        const applications = await Application.find({ jobId: req.params.jobId });
        res.json(applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Failed to fetch applications.' });
      }
    });

router.put('/applications/:applicationId', async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
          req.params.applicationId,
          { status: req.body.status },
          { new: true }
        );
        res.json({ message: 'Application status updated successfully!', application });
      } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Failed to update status.' });
      }
    });
router.put('/api/jobs/:jobId/status', updateJobStatus);

// router.post('/api/applications/apply', async (req, res) => {
//   try {
//     const { studentId, jobId, coverLetter, resume } = req.body;

//     // Check if job exists
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     // Check if student exists
//     const student = await Student.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     // Create application
//     const application = new Application({
//       studentId,
//       jobId,
//       coverLetter,
//       resume,
//       status: 'pending',
//     });

//     await application.save();

//     res.status(201).json({ message: 'Application submitted successfully', application });
//   } catch (error) {
//     console.error('Error applying for job:', error.message);
//     res.status(500).json({ error: 'Error applying for job' });
//   }
// });

// router.post('/api/applications/apply', async (req, res) => {
//   try {
//     const { studentId, jobId, coverLetter, resume } = req.body;

//     // Check if job exists
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     // Check if student exists
//     const student = await Student.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     // Create application
//     const application = new Application({
//       studentId,
//       jobId,
//       coverLetter,
//       resume,
//       status: 'pending',
//     });

//     await application.save();

//     res.status(201).json({ message: 'Application submitted successfully', application });
//   } catch (error) {
//     console.error('Error applying for job:', error.message);
//     res.status(500).json({ error: 'Error applying for job' });
//   }
// });


// router.post('/api/applications/apply', async (req, res) => {
//   try {
//     const { studentId, jobId, coverLetter, resume } = req.body;

//     // Check if the job exists
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     // Check if the student exists
//     const student = await Student.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     // Create a new application
//     const application = new Application({
//       studentId,
//       jobId,
//       companyId: job.companyId, // Assuming the job contains a reference to the company
//       coverLetter,
//       resume,
//       status: 'pending',
//     });

//     await application.save();
//     res.status(201).json({ message: 'Application submitted successfully', application });
//   } catch (error) {
//     console.error('Error applying for the job:', error.message);
//     res.status(500).json({ error: 'Error applying for the job', details: error.message });
//   }
// });


router.post('/api/applications/apply', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    const { jobId, studentId, coverLetter } = req.body;
    const resume = req.file ? req.file.path : null; // Store file path for resume if uploaded
    console.log("Uploaded file:", req.file);
    // Find the job to verify if it exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Create a new application
    const newApplication = new Application({
      jobId,
      studentId,
      coverLetter,
      resume,
    });

    await newApplication.save();

    res.status(200).json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ error: "Server error while applying for job" });
  }
});

module.exports = router;
