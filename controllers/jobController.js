// const Job = require('../models/Job'); // Assuming you have a Job model

// // Create a new job listing
// const createJob = async (req, res) => {
//     try {
//         const { jobTitle, company, description, qualifications, applicationDeadline } = req.body;

//         const job = new Job({
//             jobTitle,
//             company,
//             description,
//             qualifications,
//             applicationDeadline
//         });

//         await job.save();
//         res.status(201).json({ message: 'Job created successfully', job });
//     } catch (error) {
//         console.error('Error in createJob:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Get all job listings
// const getAllJobs = async (req, res) => {
//     try {
//         const jobs = await Job.find();
//         res.status(200).json(jobs);
//     } catch (error) {
//         console.error('Error in getAllJobs:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Update a job listing
// const updateJob = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const updatedData = req.body;

//         const job = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });
//         if (!job) {
//             return res.status(404).json({ message: 'Job not found' });
//         }

//         res.status(200).json({ message: 'Job updated successfully', job });
//     } catch (error) {
//         console.error('Error in updateJob:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Delete a job listing
// const deleteJob = async (req, res) => {
//     try {
//         const jobId = req.params.id;

//         const job = await Job.findByIdAndDelete(jobId);
//         if (!job) {
//             return res.status(404).json({ message: 'Job not found' });
//         }

//         res.status(200).json({ message: 'Job deleted successfully' });
//     } catch (error) {
//         console.error('Error in deleteJob:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = {
//     createJob,
//     getAllJobs,
//     updateJob,
//     deleteJob
// };

const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const { jobTitle, vacancies, companyId, description, requirements } = req.body;
        
        // Here, assume Job is your Job model
        const newJob = await Job.create({
            jobTitle,
            vacancies,
            companyId,
            description,
            requirements,
            applicationsReceived: 0,
            applicationsRejected: 0,
            applicationsSelected: 0,
            status: 'Open'
        });

        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Failed to create job' });
    }
};


exports.getJobDetails = async (req, res) => {
    try {
        const { jobId } = req.params;
        
        // Find job by ID
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job details:', error);
        res.status(500).json({ error: 'Failed to fetch job details' });
    }
};

exports.updateJobStatus = async (req, res) => {
    try {
        const { jobId } = req.params; // Get jobId from request parameters
        const { status } = req.body; // Get status from request body

        // Validate status (optional, depending on your requirements)
        const validStatuses = ['open', 'closed', 'pending']; // Define valid statuses
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find the job by ID and update its status
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { status }, // Update the status
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(updatedJob); // Return the updated job details
    } catch (error) {
        console.error('Error updating job status:', error);
        res.status(500).json({ error: 'Failed to update job status' });
    }
};