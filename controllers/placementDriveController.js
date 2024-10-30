const PlacementDrive = require('../models/PlacementDrive'); // Assuming you have a PlacementDrive model

// Create a new placement drive
const createPlacementDrive = async (req, res) => {
    try {
        const { driveName, startDate, endDate, companies, students } = req.body;

        const placementDrive = new PlacementDrive({
            driveName,
            startDate,
            endDate,
            companies,
            students
        });

        await placementDrive.save();
        res.status(201).json({ message: 'Placement drive created successfully', placementDrive });
    } catch (error) {
        console.error('Error in createPlacementDrive:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all placement drives
const getAllPlacementDrives = async (req, res) => {
    try {
        const placementDrives = await PlacementDrive.find();
        res.status(200).json(placementDrives);
    } catch (error) {
        console.error('Error in getAllPlacementDrives:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get details of a single placement drive
const getPlacementDriveById = async (req, res) => {
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

module.exports = {
    createPlacementDrive,
    getAllPlacementDrives,
    getPlacementDriveById
};
