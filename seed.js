const mongoose = require('mongoose');
const Application = require('./models/Application');

mongoose.connect('mongodb+srv://rohinth:Nl9fc68cJO591Nqg@cluster0.uqp3t.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });

const seedApplications = async () => {
  await Application.deleteMany(); // Clear existing data

  await Application.insertMany([
    { jobId: 'J001', studentId: 'S001', status: 'applied' },
    { jobId: 'J002', studentId: 'S002', status: 'reviewed' },
    { jobId: 'J003', studentId: 'S003', status: 'selected' },
  ]);

  console.log('Seed data inserted');
  mongoose.disconnect();
};

seedApplications();
