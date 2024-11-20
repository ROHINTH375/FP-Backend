// controllers/academicController.js
const AcademicRecord = require('../models/AcademicRecord');

exports.createOrUpdateAcademicRecord = async (req, res) => {
  try {
    const { studentId, grades, achievements, transcriptUrl } = req.body;

    const record = await AcademicRecord.findOneAndUpdate(
      { studentId },
      { grades, achievements, transcriptUrl },
      { new: true, upsert: true } // Create if not exists, update if exists
    );

    res.status(200).json({ message: 'Academic record saved successfully', record });
  } catch (error) {
    console.error('Error saving academic record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getAcademicRecord = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      const record = await AcademicRecord.findOne({ studentId }).populate('studentId', 'name email');
      if (!record) {
        return res.status(404).json({ message: 'Academic record not found' });
      }
  
      res.status(200).json(record);
    } catch (error) {
      console.error('Error fetching academic record:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  