const Interview = require('../models/Interview'); // Assuming you have an Interview model
const nodemailer = require('nodemailer');


// Schedule an interview
// const scheduleInterview = async (req, res) => {
//     try {
//         const { studentEmail, company, interviewTime, format } = req.body;

//         const interview = new Interview({
//             studentEmail,
//             company,
//             interviewTime,
//             format
//         });

//         await interview.save();
//         res.status(201).json({ message: 'Interview scheduled successfully', interview });
//     } catch (error) {
//         console.error('Error in scheduleInterview:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
const scheduleInterview = async (req, res) => {
  try {
    const { studentId, companyId, jobId, interviewDate, interviewFormat, zoomLink } = req.body;
    const interview = new Interview({ studentId, companyId, jobId, interviewDate, interviewFormat, zoomLink });
    await interview.save();

    // Fetch student email
    const student = await Student.findById(studentId);

    // Configure NodeMailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: 'Interview Scheduled',
      text: `Dear ${student.firstname},\n\nYour interview for ${jobId} is scheduled on ${new Date(interviewDate).toLocaleString()}.\n\nBest Regards,\nPlacement Team`,
    });

    res.status(201).json({ message: 'Interview scheduled and notification sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling interview.' });
  }
};
// Get all interviews for a student
const getStudentInterviews = async (req, res) => {
    try {
        const { email } = req.params;
        const interviews = await Interview.find({ studentEmail: email });
        res.status(200).json(interviews);
    } catch (error) {
        console.error('Error in getStudentInterviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update interview status
const updateInterviewStatus = async (req, res) => {
    try {
        const interviewId = req.params.id;
        const updatedData = req.body;

        const interview = await Interview.findByIdAndUpdate(interviewId, updatedData, { new: true });
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        res.status(200).json({ message: 'Interview status updated successfully', interview });
    } catch (error) {
        console.error('Error in updateInterviewStatus:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// exports.scheduleInterview = async (req, res) => {
//     try {
//       const { studentId, companyId, jobId, interviewDate, interviewFormat, zoomLink } = req.body;
  
//       const interview = new Interview({
//         studentId,
//         companyId,
//         jobId,
//         interviewDate,
//         interviewFormat,
//         zoomLink
//       });
  
//       await interview.save();
  
//       // Send email notification (example)
//       // Configure nodemailer transporter here with your email service
//       const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });
  
//       const mailOptions = {
//         from: 'placement@university.com',
//         to: 'student@example.com',
//         subject: 'Interview Scheduled',
//         text: `Your interview for job ${jobId} is scheduled on ${interviewDate}. Format: ${interviewFormat}.`,
//       };
  
//       await transporter.sendMail(mailOptions);
  
//       res.status(201).json({ message: 'Interview scheduled successfully', interview });
//     } catch (error) {
//       console.error("Error scheduling interview:", error);
//       res.status(500).json({ error: 'Error scheduling interview' });
//     }
//   };

  // Get interviews for a student
  exports.scheduleInterview = async (req, res) => {
    try {
      const { studentId, companyId, jobId, interviewDate, interviewFormat, zoomLink } = req.body;
  
      // Validate required fields
      if (!studentId || !companyId || !jobId || !interviewDate) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      const interview = new Interview({
        studentId,
        companyId,
        jobId,
        interviewDate,
        interviewFormat,
        zoomLink,
      });
  
      await interview.save();
  
      // Send email notification (example)
      const student = await Student.findById(studentId);
      if (student) {
        await sendEmail(student.email, 'Interview Scheduled', `Your interview is scheduled on ${interviewDate}`);
      }
  
      res.status(201).json({ message: 'Interview scheduled successfully.', interview });
    } catch (error) {
      console.error('Error scheduling interview:', error);
      res.status(500).json({ message: 'Error scheduling interview', error });
    }
  };
  
  exports.getStudentInterviews = async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const interviews = await Interview.find({ studentId }).populate('companyId jobId');
  
      res.status(200).json(interviews);
    } catch (error) {
      console.error("Error retrieving interviews:", error);
      res.status(500).json({ error: 'Error retrieving interviews' });
    }
  };

module.exports = {
    scheduleInterview,
    getStudentInterviews,
    updateInterviewStatus
};
