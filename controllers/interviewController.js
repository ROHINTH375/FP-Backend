const Interview = require('../models/Interview'); // Assuming you have an Interview model

// Schedule an interview
const scheduleInterview = async (req, res) => {
    try {
        const { studentEmail, company, interviewTime, format } = req.body;

        const interview = new Interview({
            studentEmail,
            company,
            interviewTime,
            format
        });

        await interview.save();
        res.status(201).json({ message: 'Interview scheduled successfully', interview });
    } catch (error) {
        console.error('Error in scheduleInterview:', error);
        res.status(500).json({ message: 'Internal server error' });
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

module.exports = {
    scheduleInterview,
    getStudentInterviews,
    updateInterviewStatus
};
