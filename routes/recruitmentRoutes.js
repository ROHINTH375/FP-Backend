const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { getRecruitmentStats } = require('../controllers/recruitmentController');
router.get('/recruitment-stats', getRecruitmentStats);
router.get('/recruitment-stats', async (req, res) => {
  try {
    const stats = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(stats);
  } catch (error) {
    console.error('Error generating recruitment stats:', error);
    res.status(500).json({ message: 'Error generating recruitment stats.' });
  }
});

module.exports = router;
