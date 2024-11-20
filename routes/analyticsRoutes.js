// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Interview = require('../models/Interview');
const Student = require('../models/Student');

router.get('/reports', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalApplications = await Application.countDocuments();
    const interviewsConducted = await Interview.countDocuments();
    const hiredStudents = await Application.countDocuments({ status: 'selected' });

    const hiringRate = ((hiredStudents / totalStudents) * 100).toFixed(2);
    const applicationRate = ((totalApplications / totalStudents) * 100).toFixed(2);

    res.status(200).json({
      totalStudents,
      totalApplications,
      interviewsConducted,
      hiredStudents,
      hiringRate,
      applicationRate,
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ message: 'Error fetching reports data.' });
  }
});

module.exports = router;