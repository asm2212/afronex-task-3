// app.js
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/budget', require('./routes/budgetRoutes'));
app.use('/api/expense', require('./routes/expenseRoutes'));
app.use('/api/report', require('./routes/reportRoutes'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;
