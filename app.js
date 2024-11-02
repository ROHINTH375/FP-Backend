const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes'); // Import the auth routes
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes = require('./routes/companyRoutes');
const path = require('path');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const jobRoutes = require('./routes/jobRoutes');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', adminRoutes);

app.use('/api/jobs', jobRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder to serve the React frontend
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    // Catch-all route to serve React's index.html
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
  }

  app.get('/api/companies', (req, res) => {
    // Your code to retrieve and send back companies
    res.json({ message: "Companies retrieved successfully" });
});

  // Test route
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: "Frontend and Backend are connected!" });
});