// routes/studentRoutes.js
// Connects URLs to the handler functions.

const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/Student');
const createStudentHandlers = require('./studentHandlers');

const router = express.Router();
const { createStudent, getStudents } = createStudentHandlers(Student);

// If MongoDB is not connected, answer clearly instead of waiting forever.
// readyState 1 means "connected".
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is not connected. Start MongoDB and restart the server.'
    });
  }
  next();
});

router.post('/', createStudent); // POST /api/students
router.get('/', getStudents);    // GET  /api/students

module.exports = router;
