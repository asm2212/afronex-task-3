const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    throw new Error(`Error connecting to MongoDB: ${error.message}`);
  };
};

module.exports = connectDB;