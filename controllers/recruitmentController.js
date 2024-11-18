const Application = require('../models/Application');
const PlacementDrive = require('../models/PlacementDrive');
const Student = require('../models/Student');

exports.getRecruitmentStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalPlaced = await Application.countDocuments({ status: 'Selected' });
    const totalApplications = await Application.countDocuments();
    const totalOffersAccepted = await Application.countDocuments({ status: 'Accepted' });

    const successRate = ((totalPlaced / totalStudents) * 100).toFixed(2);
    const offerAcceptanceRate = ((totalOffersAccepted / totalPlaced) * 100).toFixed(2);

    const placementDrives = await PlacementDrive.find()
      .populate('companiesParticipating')
      .select('title date companiesParticipating');

    res.status(200).json({
      totalStudents,
      totalPlaced,
      totalApplications,
      totalOffersAccepted,
      successRate,
      offerAcceptanceRate,
      placementDrives,
    });
  } catch (error) {
    console.error('Error fetching recruitment stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
