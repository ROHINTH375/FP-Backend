// const mongoose = require('mongoose');
// const CompanySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   jobOpenings: [{ jobTitle: String }],
// });


// module.exports = mongoose.model('Company', CompanySchema);

const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
