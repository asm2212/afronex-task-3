
const express = require('express');
const router = express.Router();      
const authServices = require('../services/authServices.js');

router.post('/register', authServices.register);
router.post('/login', authServices.login);
router.get('/verifyEmail/:token', authServices.verifyEmail);
router.post('/forgotPassword', authServices.forgotPassword);
router.post('/resetPassword/:token', authServices.resetPassword);

module.exports = router;

