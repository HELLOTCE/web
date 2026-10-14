// routes/studentHandlers.js
// The actual logic of the two API endpoints.
// The Student model is passed in, so the tests can give a fake model
// and run without a real MongoDB database.

const { validateStudent } = require('../public/js/validators'); // same rules as the browser form

function createStudentHandlers(Student) {
  // POST /api/students  -> validate and save one student
  async function createStudent(req, res) {
    try {
      const body = req.body || {};
      const result = validateStudent(body);

      // If validation fails, answer with 400 (Bad Request) and the list of errors
      if (!result.valid) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: result.errors });
      }

      // Save into MongoDB
      const student = await Student.create({
        name: String(body.name).trim(),
        email: String(body.email).trim(),
        department: String(body.department).trim(),
        yearOfStudy: Number(body.yearOfStudy)
      });

      return res.status(201).json({ success: true, message: 'Student saved successfully', student });
    } catch (error) {
      // Mongoose can also complain (for example if a rule in the model is broken)
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message });
      }
      console.error('Error saving student:', error.message);
      return res.status(500).json({ success: false, message: 'Server error while saving student' });
    }
  }

  // GET /api/students  -> return all saved students (newest first)
  async function getStudents(req, res) {
    try {
      const students = await Student.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: students.length, students });
    } catch (error) {
      console.error('Error reading students:', error.message);
      return res.status(500).json({ success: false, message: 'Server error while reading students' });
    }
  }

  return { createStudent, getStudents };
}

module.exports = createStudentHandlers;
