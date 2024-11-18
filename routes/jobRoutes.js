const express = require('express');
const { createJob, getJobDetails, updateJobStatus } = require('../controllers/jobController');
const router = express.Router();
const Job = require('../models/Job'); // Assuming you have a Job model
const Application = require('../models/Application');

// POST /api/jobs/create - Create a new job posting
router.post('/create', async (req, res) => {
    console.log("Request Body:", req.body);
    try {
        const { companyId, jobTitle, jobDescription, requirements } = req.body;

        // Validate required fields
        if (!companyId || !jobTitle || !jobDescription || !requirements) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new job
        const job = new Job({
            companyId,
            jobTitle,
            jobDescription,
            requirements,
        });
        await job.save();

        res.status(201).json({ message: "Job posted successfully!", job });
    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Error posting job", error: error.message });
    }
});
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

module.exports = router;
