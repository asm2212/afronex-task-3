const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    throw new Error(`Error connecting to MongoDB: ${error.message}`);
  };
};

module.exports = connectDB;