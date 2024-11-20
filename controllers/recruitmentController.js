// const Application = require('../models/Application');
// const PlacementDrive = require('../models/PlacementDrive');
// const Student = require('../models/Student');

// exports.getRecruitmentStats = async (req, res) => {
//   try {
//     const totalStudents = await Student.countDocuments();
//     const totalPlaced = await Application.countDocuments({ status: 'Selected' });
//     const totalApplications = await Application.countDocuments();
//     const totalOffersAccepted = await Application.countDocuments({ status: 'Accepted' });

//     // Calculate success rates with safeguards
//     const successRate = totalStudents ? ((totalPlaced / totalStudents) * 100).toFixed(2) : 0;
//     const offerAcceptanceRate = totalPlaced ? ((totalOffersAccepted / totalPlaced) * 100).toFixed(2) : 0;

//     // Fetch placement drives and populate related companies
//     const placementDrives = await PlacementDrive.find()
//       .populate('companiesParticipating', 'name email') // Populate only required fields
//       .select('title date companiesParticipating');

//     // Send response
//     res.status(200).json({
//       totalStudents: totalStudents || 0,
//       totalPlaced: totalPlaced || 0,
//       totalApplications: totalApplications || 0,
//       totalOffersAccepted: totalOffersAccepted || 0,
//       successRate,
//       offerAcceptanceRate,
//       placementDrives: placementDrives || [],
//     });
//   } catch (error) {
//     console.error('Error fetching recruitment stats:', error.message, error.stack);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const Application = require('../models/Application');
const PlacementDrive = require('../models/PlacementDrive');
const Student = require('../models/Student');

exports.getRecruitmentStats = async (req, res) => {
  try {
    // Fetch all individual application records
    const applications = await Application.find()
      .select('jobId studentId status') // Select only the fields you need
      .lean(); // Returns plain JavaScript objects instead of Mongoose documents

    // Send response with individual records
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching recruitment stats:', error.message, error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
};
