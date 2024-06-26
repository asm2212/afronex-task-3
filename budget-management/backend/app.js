// app.js
const express = require('express');
const connectDB = require('./config/db');


const app = express();

connectDB();



app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/budget', require('./routes/budgetRoutes'));
app.use('/api/expense', require('./routes/expenseRoutes'));
app.use('/api/report', require('./routes/reportRoutes'));
app.use('/user-dashboard',require('./routes/userDashboardRoutes.js'));


module.exports = app;





