const express = require('express');
const router = express.Router();
// const Application = require('../models/Application');
const { getRecruitmentStats } = require('../controllers/recruitmentController');
router.get('/recruitment-stats', getRecruitmentStats);
// router.get('/recruitment-stats', async (req, res) => {
//   try {
//     const stats = await Application.aggregate([
//       {
//         $group: {
//           _id: '$status',
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.json(stats);
//   } catch (error) {
//     console.error('Error generating recruitment stats:', error);
//     res.status(500).json({ message: 'Error generating recruitment stats.' });
//   }
// });

// router.post('/recruitment-stats', (req, res) => {
//   const { jobId, studentId, status } = req.body;

//   // Validate and process the data
//   if (!jobId || !studentId || !status) {
//       return res.status(400).json({ error: 'All fields are required.' });
//   }

//   // Example response
//   res.status(200).json({ message: 'Recruitment stats updated successfully!' });
// });
router.get('/api/recruitment-stats', async (req, res) => {
  try {
      // Fetch all recruitment stats (record-style)
      const recruitmentStats = await RecruitmentStat.find(); // Replace with your model
      res.json(recruitmentStats);
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
