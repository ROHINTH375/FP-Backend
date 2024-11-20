// const Application = require('../models/Application');

// const submitApplication = async (req, res) => {
//   const { jobTitle, companyId, resumeLink, coverLetter } = req.body;
//   try {
//     const application = new Application({
//       student: req.user.id,
//       company: companyId,
//       jobTitle,
//       resumeLink,
//       coverLetter
//     });
//     await application.save();
//     res.status(201).json({ message: 'Application submitted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ student: req.user.id }).populate('company');
//     res.status(200).json(applications);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { submitApplication, getApplications };

const Application = require('../models/Application');
const Company = require('../models/Company');
const Student = require('../models/Student');
const Job = require('../models/Job');

// Create a new application for a job
exports.createApplication = async (req, res) => {
  try {
      const application = new Application({
          studentId: req.body.studentId,
          jobId: req.body.jobId,
          status: req.body.status,
          description: req.body.description,
          title: req.body.title,
          companyId: req.body.companyId,
          appliedDate: req.body.appliedDate
      });
      await application.save();
      res.status(201).json({ message: "Application created successfully", application });
  } catch (err) {
      res.status(400).json({ error: "Error creating application", details: err });
  }
};


exports.getApplicationsByJobId = async (req, res) => {
  try {
      const applications = await Application.find({ jobId: req.params.jobId }).populate('studentId jobId companyId');
      res.status(200).json(applications);
  } catch (err) {
      res.status(400).json({ error: "Error fetching applications", details: err });
  }
};

// Get all applications for a specific student
exports.getStudentApplications = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Retrieve applications for the student
    const applications = await Application.find({ studentId }).populate('jobId', 'jobTitle');
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};

// Get all applications for a specific company
exports.getCompanyApplications = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Retrieve applications for the company
    const applications = await Application.find({ companyId }).populate('studentId', 'name');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find(); // Fetch all applications
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Apply for a Job
exports.applyForJob = async (req, res) => {
  try {
    const { studentId, jobId, resume } = req.body;

    // Validate input (example: check if job exists)
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    // Create a new application
    const application = new Application({
        studentId,
        jobId,
        resume
    });

    await application.save(); // Save application to the database

    res.status(201).json({ message: 'Application submitted successfully', application });
} catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ error: 'Error applying for job' });
}
};

// Get Application Status
exports.getApplicationStatus = async (req, res) => {
  const { studentId } = req.params;
  try {
    const { applicationId } = req.params; // Get applicationId from request parameters
    
    // Find application by ID
    const application = await Application.findById(applicationId);

    if (!application) {
        return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ status: application.status }); // Return the status of the application
} catch (error) {
    console.error('Error fetching application status:', error);
    res.status(500).json({ error: 'Failed to fetch application status' });
}
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params; // Get applicationId from request parameters
    const { status } = req.body; // Get new status from request body

    // Validate status (optional, depending on your requirements)
    const validStatuses = ['application reviewed', 'rejected', 'selected', 'waiting list'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    // Find the application by ID and update its status
    const updatedApplication = await Application.findByIdAndUpdate(
        applicationId,
        { status }, // Update the status
        { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedApplication) {
        return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(updatedApplication); // Return the updated application details
} catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Failed to update application status' });
}
};