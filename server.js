// server.js - starts the website and the API.

require('dotenv').config(); // reads values from the ".env" file

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_portal';

app.use(express.json()); // lets the server read JSON sent by the form

// Serve the website files (login page is public/index.html)
app.use(express.static(path.join(__dirname, 'public')));
// Serve the demo examples (AngularJS, XML) at /examples/...
app.use('/examples', express.static(path.join(__dirname, 'examples')));

// API routes
app.use('/api/students', studentRoutes);

// Quick check that the server and database are working: GET /api/health
app.get('/api/health', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  res.json({ success: true, server: 'running', database: dbConnected ? 'connected' : 'not connected' });
});

// Unknown API URL -> JSON 404
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Start the web server first, so the pages still open even if MongoDB is off.
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Connect to MongoDB (database name "student_portal" is in the connection string)
mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('MongoDB connected: ' + MONGODB_URI))
  .catch((error) => {
    console.error('MongoDB connection FAILED: ' + error.message);
    console.error('Start MongoDB (see README.md, Step 3) and restart this server.');
  });
