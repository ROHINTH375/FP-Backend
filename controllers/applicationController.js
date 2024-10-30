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

// Create a new application for a job
exports.createApplication = async (req, res) => {
  try {
    const { studentId, companyId } = req.body;

    // Check if student and company exist
    const student = await Student.findById(studentId);
    const company = await Company.findById(companyId);
    if (!student || !company) {
      return res.status(404).json({ message: 'Student or Company not found' });
    }

    // Create a new application
    const application = new Application({
      studentId,
      companyId,
      status: 'submitted',
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating application', error });
  }
};

// Get all applications for a specific student
exports.getStudentApplications = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Retrieve applications for the student
    const applications = await Application.find({ studentId }).populate('companyId', 'name');
    res.json(applications);
  } catch (error) {
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
