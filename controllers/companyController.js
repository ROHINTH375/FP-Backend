// const Company = require('../models/Company'); 
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Create a new company
// const createCompany = async (req, res) => {
//     try {
//         const companyData = req.body; // Get the data from the request body
//         const newCompany = new Company(companyData); // Create a new company instance
//         await newCompany.save(); // Save the company to the database
//         res.status(201).json(newCompany); // Respond with the created company
//     } catch (error) {
//         res.status(500).json({ message: error.message }); // Handle errors
//     }
// };

// // Register a new company
// const registerCompany = async (req, res) => {
//     try {
//         const { name, email, password, jobListings, companyDetails } = req.body;
        
//         if (!name || !email || !password || !jobListings || !companyDetails) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Check if company already exists
//         let company = await Company.findOne({ email });
//         if (company) {
//             return res.status(400).json({ message: 'Company already exists' });
//         }

//         // Create and save new company
//         company = new Company({
//             name,
//             email,
//             password, // Assume password is hashed in a pre-save middleware in the model
//             jobListings,
//             companyDetails
//         });

//         await company.save();

//         res.status(201).json({ message: 'Company registered successfully', company });
//     } catch (error) {
//         console.error('Error in registerCompany:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Get all companies
// const getAllCompanies = async (req, res) => {
//     try {
//         const companies = await Company.find();
//         res.status(200).json(companies);
//     } catch (error) {
//         console.error('Error in getAllCompanies:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Get company by ID
// const getCompanyById = async (req, res) => {
//     try {
//         const companyId = req.params.id;
//         const company = await Company.findById(companyId);

//         if (!company) {
//             return res.status(404).json({ message: 'Company not found' });
//         }

//         res.status(200).json(company);
//     } catch (error) {
//         console.error('Error in getCompanyById:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Update company details
// const updateCompany = async (req, res) => {
//     try {
//         const companyId = req.params.id;
//         const updatedData = req.body;

//         const company = await Company.findByIdAndUpdate(companyId, updatedData, { new: true });

//         if (!company) {
//             return res.status(404).json({ message: 'Company not found' });
//         }

//         res.status(200).json({ message: 'Company updated successfully', company });
//     } catch (error) {
//         console.error('Error in updateCompany:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Delete a company
// const deleteCompany = async (req, res) => {
//     try {
//         const companyId = req.params.id;

//         const company = await Company.findByIdAndDelete(companyId);

//         if (!company) {
//             return res.status(404).json({ message: 'Company not found' });
//         }

//         res.status(200).json({ message: 'Company deleted successfully' });
//     } catch (error) {
//         console.error('Error in deleteCompany:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = {
//     registerCompany,
//     getAllCompanies,
//     getCompanyById,
//     updateCompany,
//     deleteCompany,
//     createCompany,
// };


const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register a new company
exports.registerCompany = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    // Check if the company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new company
    const company = new Company({
      name,
      email,
      password: hashedPassword,
      location,
    });

    await company.save();
    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering company', error });
  }
};

// Login a company
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the company exists
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, companyId: company._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.getAllCompanies = async (req, res) => {
        try {
            const companies = await Company.find();
            res.status(200).json(companies);
        } catch (error) {
            console.error('Error in getAllCompanies:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };