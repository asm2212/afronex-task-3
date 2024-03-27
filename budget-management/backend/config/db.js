const mongoose = require('mongoose');
const dotenv = require('dotenv');

const db = async () => {
  dotenv.config();
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};

module.exports = { db };