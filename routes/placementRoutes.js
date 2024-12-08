const express = require('express');
const router = express.Router();
const PlacementDrive = require('../models/PlacementDrive'); // Ensure the correct path

// POST route to create a placement drive
router.post('/placement-drives', async (req, res) => {
  try {
    const { title, date, companiesParticipating } = req.body;

    // Check if all fields are present
    if (!title || !date || !companiesParticipating || companiesParticipating.length === 0) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new placement drive document
    const newPlacementDrive = new PlacementDrive({
      title,
      date,
      companiesParticipating,
    });

    // Save the document to the database
    await newPlacementDrive.save();

    // Return a success response
    res.status(201).json({ message: 'Placement Drive created successfully', data: newPlacementDrive });
  } catch (err) {
    console.error('Error creating placement drive:', err.message); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

module.exports = router;
