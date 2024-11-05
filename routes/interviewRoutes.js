// routes/interviewRoutes.js
const express = require('express');
const { scheduleInterview, getStudentInterviews } = require('../controllers/interviewController');
const router = express.Router();
const Interview = require('../models/Interview');
const mongoose = require('mongoose');
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
// router.post('/schedule', async (req, res) => {
//     console.log('Incoming request body:', req.body); // Log the incoming data
    
//     try {
//         const { interviewDate, jobId, companyId, studentId } = req.body;

//         // Check for required fields
//         if (!interviewDate || !jobId || !companyId || !studentId) {
//             return res.status(400).json({ message: 'interviewDate, jobId, companyId, and studentId are required.' });
//         }

//         const newInterview = new Interview({
//             interviewDate,
//             jobId,
//             companyId,
//             studentId // Add studentId to the new Interview document
//         });

//         await newInterview.save();
//         res.status(201).json({ message: 'Interview scheduled successfully' });
//     } catch (error) {
//         console.error('Error scheduling interview:', error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// });
router.get('/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const interviews = await Interview.find({ studentId });
        res.status(200).json(interviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving interviews' });
    }
});

router.post('/schedule', async (req, res) => {
    console.log('Incoming request body:', req.body);

    const { interviewDate, jobId, companyId, studentId } = req.body;

    if (!interviewDate || !jobId || !companyId || !studentId) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate ObjectId formats
    if (!isValidObjectId(jobId) || !isValidObjectId(companyId) || !isValidObjectId(studentId)) {
        return res.status(400).json({ message: 'Invalid ID format for jobId, companyId, or studentId.' });
    }

    try {
        const newInterview = new Interview({
            interviewDate,
            jobId,
            companyId,
            studentId
        });

        await newInterview.save();
        res.status(201).json({ message: 'Interview scheduled successfully' });
    } catch (error) {
        console.error('Error scheduling interview:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
