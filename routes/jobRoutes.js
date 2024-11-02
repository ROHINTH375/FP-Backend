const express = require('express');
const { createJob, getJobDetails, updateJobStatus } = require('../controllers/jobController');
const router = express.Router();

router.post('/create-job', createJob); // Route to create a job
router.get('/:jobId', getJobDetails); // Get details of a specific job
router.put('/api/jobs/:jobId/status', updateJobStatus);

module.exports = router;
