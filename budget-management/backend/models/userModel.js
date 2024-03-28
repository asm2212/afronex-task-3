const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['regular', 'admin'],
    default: 'regular',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  emailVerification: {
    type: String,
    default: null,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  resetToken: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('User', UserSchema);