// models/Student.js
// A Mongoose "model" describes what one student record looks like in MongoDB.
// Mongoose will store these records in a collection called "students".

const mongoose = require('mongoose');

// Schema = the fields and their rules.
// To add a new field for the exam, add a line here, then add it to
// public/student-form.html, public/js/validators.js and public/student-records.html.
const studentSchema = new mongoose.Schema(
  {
    name:        { type: String, required: [true, 'Name is required'], trim: true },
    email:       { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    department:  { type: String, required: [true, 'Department is required'], trim: true },
    yearOfStudy: { type: Number, required: [true, 'Year of study is required'], min: 1, max: 4 }
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Student', studentSchema);
