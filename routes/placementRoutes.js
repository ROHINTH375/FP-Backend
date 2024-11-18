const express = require('express');
const router = express.Router();
const PlacementDrive = require('../models/PlacementDrive'); // Create a PlacementDrive model
const {
    createPlacementDrive,
    getAllPlacementDrives,
    updatePlacementDrive,
    deletePlacementDrive,
  } = require('../controllers/placementDriveController');

  router.post('/placement-drives', createPlacementDrive); // Create a placement drive
router.get('/placement-drives', getAllPlacementDrives); // Get all placement drives
router.put('/placement-drives/:id', updatePlacementDrive); // Update a placement drive
router.delete('/placement-drives/:id', deletePlacementDrive); // Delete a placement drive

// Create a new placement drive
router.post('/create', async (req, res) => {
  try {
    const { name, date, location, companies, students, description } = req.body;
    const newDrive = new PlacementDrive({ name, date, location, companies, students, description });
    await newDrive.save();
    res.status(201).json({ message: 'Placement Drive created successfully!', drive: newDrive });
  } catch (error) {
    console.error('Error creating placement drive:', error);
    res.status(500).json({ message: 'Error creating placement drive' });
  }
});

// Get all placement drives
router.get('/', async (req, res) => {
  try {
    const drives = await PlacementDrive.find().populate('companies students');
    res.status(200).json(drives);
  } catch (error) {
    console.error('Error fetching placement drives:', error);
    res.status(500).json({ message: 'Error fetching placement drives' });
  }
});

// Update a placement drive
router.put('/:id', async (req, res) => {
  try {
    const updatedDrive = await PlacementDrive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Placement Drive updated successfully!', drive: updatedDrive });
  } catch (error) {
    console.error('Error updating placement drive:', error);
    res.status(500).json({ message: 'Error updating placement drive' });
  }
});

// Delete a placement drive
router.delete('/:id', async (req, res) => {
  try {
    await PlacementDrive.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Placement Drive deleted successfully!' });
  } catch (error) {
    console.error('Error deleting placement drive:', error);
    res.status(500).json({ message: 'Error deleting placement drive' });
  }
});
// Create a new placement drive
router.post('/placement-drives', async (req, res) => {
  try {
    const { title, date, companies, participants } = req.body;
    const drive = new PlacementDrive({ title, date, companies, participants });
    await drive.save();
    res.status(201).json({ message: 'Placement Drive created successfully', drive });
  } catch (error) {
    console.error('Error creating placement drive:', error);
    res.status(500).json({ message: 'Error creating placement drive.' });
  }
});

// Fetch all placement drives
router.get('/placement-drives', async (req, res) => {
  try {
    const drives = await PlacementDrive.find().populate('companies participants');
    res.json(drives);
  } catch (error) {
    console.error('Error fetching placement drives:', error);
    res.status(500).json({ message: 'Error fetching placement drives.' });
  }
});

// Fetch stats for reports
router.get('/placement-drives/stats', async (req, res) => {
  try {
    const stats = await PlacementDrive.aggregate([
      { $unwind: '$participants' },
      {
        $group: {
          _id: '$title',
          totalParticipants: { $sum: 1 },
          totalInterviews: { $sum: '$interviewsConducted' },
          totalOffers: { $sum: '$offersMade' },
        },
      },
    ]);
    res.json(stats);
  } catch (error) {
    console.error('Error generating placement stats:', error);
    res.status(500).json({ message: 'Error generating stats.' });
  }
});

module.exports = router;
