const Job = require('../models/Job'); // Assuming you have a Job model

// Create a new job listing
const createJob = async (req, res) => {
    try {
        const { jobTitle, company, description, qualifications, applicationDeadline } = req.body;

        const job = new Job({
            jobTitle,
            company,
            description,
            qualifications,
            applicationDeadline
        });

        await job.save();
        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        console.error('Error in createJob:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all job listings
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error in getAllJobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a job listing
const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedData = req.body;

        const job = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job updated successfully', job });
    } catch (error) {
        console.error('Error in updateJob:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a job listing
const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findByIdAndDelete(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error in deleteJob:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob
};
