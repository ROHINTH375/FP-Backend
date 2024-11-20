const express = require('express');
const router = express.Router();
const AcademicRecord = require('../models/AcademicRecord');
const { createOrUpdateAcademicRecord, getAcademicRecord } = require('../controllers/academicController');
// Middleware for authentication
const authMiddleware = require('../middlewares/authMiddleware');

// Route to add or update academic records
router.post('/add-record', authMiddleware, async (req, res) => {
  const { studentId, grades, achievements, transcriptLink } = req.body;

  try {
    const record = await AcademicRecord.findOneAndUpdate(
      { studentId },
      { grades, achievements, transcriptLink },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Academic record updated successfully!', record });
  } catch (error) {
    console.error('Error adding academic record:', error);
    res.status(500).json({ message: 'Error updating academic record', error });
  }
});

// Route to fetch academic records by student ID
router.get('/:studentId', authMiddleware, async (req, res) => {
  const { studentId } = req.params;

  try {
    const record = await AcademicRecord.findOne({ studentId }).populate('studentId', 'firstname lastname');
    if (!record) {
      return res.status(404).json({ message: 'No academic records found for this student.' });
    }
    res.status(200).json(record);
  } catch (error) {
    console.error('Error fetching academic record:', error);
    res.status(500).json({ message: 'Error fetching academic record', error });
  }
});

router.post('/', authMiddleware, createOrUpdateAcademicRecord); // Create/Update
router.get('/:studentId', authMiddleware, getAcademicRecord); // Fetch by studentId

module.exports = router;
