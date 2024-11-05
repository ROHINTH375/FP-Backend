const express = require('express');
const { createJob, getJobDetails, updateJobStatus } = require('../controllers/jobController');
const router = express.Router();
const Job = require('../models/Job'); // Assuming you have a Job model
const Application = require('../models/Application');

// POST /api/jobs/create - Create a new job posting
router.post('/api/jobs/create', async (req, res) => {
    try {
        const { companyId, jobTitle, jobDescription, requirements } = req.body;
        const job = new Job({ companyId, jobTitle, jobDescription, requirements });
        await job.save();
        res.status(200).json({ message: 'Job posted successfully!', job });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error posting job' });
    }
});
// GET /api/jobs/applications/:jobId - Get applications for a specific job
router.get('/api/jobs/applications/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await Application.find({ jobId });
        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving applications' });
    }
});

router.put('/api/jobs/applications/:applicationId', async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
        res.status(200).json({ message: 'Application status updated', application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating application status' });
    }
});
router.put('/api/jobs/:jobId/status', updateJobStatus);

module.exports = router;
