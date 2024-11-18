const PlacementDrive = require('../models/PlacementDrive'); // Assuming you have a PlacementDrive model

// Create a new placement drive
// const createPlacementDrive = async (req, res) => {
//     try {
//         const { driveName, startDate, endDate, companies, students } = req.body;

//         const placementDrive = new PlacementDrive({
//             driveName,
//             startDate,
//             endDate,
//             companies,
//             students
//         });

//         await placementDrive.save();
//         res.status(201).json({ message: 'Placement drive created successfully', placementDrive });
//     } catch (error) {
//         console.error('Error in createPlacementDrive:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
exports.createPlacementDrive = async (req, res) => {
    try {
      const { title, description, date, location, companiesParticipating } = req.body;
      const placementDrive = new PlacementDrive({
        title,
        description,
        date,
        location,
        companiesParticipating,
      });
      await placementDrive.save();
      res.status(201).json({ message: 'Placement Drive created successfully', placementDrive });
    } catch (error) {
      console.error('Error creating placement drive:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Get all placement drives
exports.getAllPlacementDrives = async (req, res) => {
    try {
        const placementDrives = await PlacementDrive.find().populate('companiesParticipating');
        res.status(200).json(placementDrives);
    } catch (error) {
        console.error('Error in getAllPlacementDrives:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get details of a single placement drive
exports.getPlacementDriveById = async (req, res) => {
    try {
        const placementDriveId = req.params.id;
        const placementDrive = await PlacementDrive.findById(placementDriveId);

        if (!placementDrive) {
            return res.status(404).json({ message: 'Placement drive not found' });
        }

        res.status(200).json(placementDrive);
    } catch (error) {
        console.error('Error in getPlacementDriveById:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a placement drive
exports.updatePlacementDrive = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedDrive = await PlacementDrive.findByIdAndUpdate(id, updates, { new: true });
      res.status(200).json({ message: 'Placement Drive updated successfully', updatedDrive });
    } catch (error) {
      console.error('Error updating placement drive:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Delete a placement drive
exports.deletePlacementDrive = async (req, res) => {
    try {
      const { id } = req.params;
      await PlacementDrive.findByIdAndDelete(id);
      res.status(200).json({ message: 'Placement Drive deleted successfully' });
    } catch (error) {
      console.error('Error deleting placement drive:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// module.exports = {
//     getAllPlacementDrives,
//     getPlacementDriveById
// };
