const Student = require('../models/Student'); // Assuming you have a Student model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');
const Application = require('../models/Application');


require('dotenv').config();



const registerStudent = async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        address,
        department,
        yearFrom,
        yearTo,
        district,
        pincode,
        phoneNumber,
        whatsappNumber,
        email,
        password,
        skills,
      } = req.body;
  
      // Validate input
      if (!firstname || !lastname || !address || !department || !yearFrom || !yearTo || !district || !pincode || !phoneNumber || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
  
      // Check if student already exists
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: 'Student already registered.' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new student
      const newStudent = new Student({
        firstname,
        lastname,
        address,
        department,
        yearFrom,
        yearTo,
        district,
        pincode,
        phoneNumber,
        whatsappNumber,
        email,
        password: hashedPassword,
        skills,
      });
  
      await newStudent.save();
      res.status(201).json({ message: 'Student registered successfully.' });
    } catch (error) {
      console.error('Error in registerStudent:', error.message); // Log error message
      console.error(error.stack); // Log stack trace for debugging
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };
  
// Register a new student
// const registerStudent = async (req, res) => {
//     try {
//         const { name, email, password, Department , Year } = req.body;

//         const newStudent = new Student({ name, email, password ,Department , Year});
//         await newStudent.save();

//         // Check if student already exists
//         let student = await Student.findOne({ email });
//         if (student) {
//             return res.status(400).json({ message: 'Student already exists' });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create and save new student
//         student = new Student({
//             name,
//             email,
//             password, // Assume password is hashed in a pre-save middleware in the model
//             Department,
//             Year
//         });

//         await student.save();

//         res.status(201).json({ message: 'Student registered successfully', student });
//     } catch (error) {
//         console.error('Error in registerStudent:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// const registerStudent = async (req, res) => {
//     try {
//         const { name, email, password, department, year } = req.body;
//         const newStudent = new Student({ name, email, password, department, year });
//         await newStudent.save();
//         res.status(201).json(newStudent);
//     } catch (error) {
//         console.error("Error registering student:", error);
//         res.status(500).json({ message: "Error registering student." });
//     }
// };

// exports.registerStudent = async (req, res) => {
//     try {
//       const { name, email, password, department, year } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const student = new Student({ name, email, password: hashedPassword, department, year });
//       await student.save();
//       res.status(201).json({ message: 'Student registered successfully' });
//     } catch (error) {
//       res.status(400).json({ message: 'Error registering student' });
//     }
//   };

 const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Student not found' });
  
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  };

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error in getAllStudents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get student by ID
const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error in getStudentById:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update student details
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedData = req.body;

        const student = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
        console.error('Error in updateStudent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        const student = await Student.findByIdAndDelete(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error in deleteStudent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getDashboardData = async (req, res) => {
    try {
        const studentId = req.user.id;

        // Fetch student data
        const student = await Student.findById(studentId).select('-password');

        // Get applications (Populate company data)
        const applications = await Application.find({ studentId }).populate('companyId', 'name');

        // Get job openings
        const jobOpenings = await Company.find().select('jobOpenings name');

        res.json({
            student,
            applications,
            jobOpenings,
        });
    } catch (error) {
        console.error('Error in getDashboardData:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const getStudentData = async (req, res) => {
    try {
        // Array of sample student data for testing
        const studentsData = [
            {
                id: 1,
                name: "Alice Smith",
                email: "alice@example.com",
                profileImage: "https://via.placeholder.com/150",
                progress: 2,
                attendance: 90,
                tasksSubmitted: 95,
                quizzesSubmitted: 80
            },
            {
                id: 2,
                name: "Bob Johnson",
                email: "bob@example.com",
                profileImage: "https://via.placeholder.com/150",
                progress: 4,
                attendance: 88,
                tasksSubmitted: 93,
                quizzesSubmitted: 85
            },
            // Add more sample data here
        ];
        res.status(200).json(studentsData);
    } catch (error) {
        console.error("Error fetching student data:", error);
        res.status(500).json({ error: "Failed to fetch student data" });
    }
};

const getStudentDashboard = async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from middleware
      console.log("User ID from middleware:", userId); // Log the user ID to ensure it's coming through correctly
  
      // Fetch student data from the database
      const studentData = await Student.findById(userId).select('-password');
      if (!studentData) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Get applications associated with the student
      const applications = await Application.find({ studentId: userId }).populate('jobId');
      console.log("Applications:", applications); // Log the applications data
  
      res.json({
        studentData,
        applications,
      });
    } catch (error) {
      console.error('Error fetching student dashboard data:', error);
      res.status(500).json({ message: 'Server error while fetching student data', error: error.message });
    }
  };
  


 
module.exports = {
    registerStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    loginStudent,
    getDashboardData,
    getStudentData,
    getStudentDashboard
};
