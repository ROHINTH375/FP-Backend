const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const { companyId, jobTitle, jobDescription, requirements } = req.body;
        
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

exports.postJob = async (req, res) => {
    try {
      const { companyId, jobTitle, jobDescription, requirements } = req.body;
  
      // Validate input
       if (!jobTitle || !jobDescription) {
      return res.status(400).json({ message: 'jobTitle and jobDescription are required' });
    }
  
      // Check if the company exists
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Create a new job
      const newJob = new Job({
        companyId,
        jobTitle,
        jobDescription,
        requirements,
      });
      console.log('Incoming Request Body:', req.body);
  
      await newJob.save();
      res.status(201).json({ message: 'Job posted successfully', job: newJob });
    } catch (error) {
      console.error('Error posting job:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  