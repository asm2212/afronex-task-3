const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, 
    { expiresIn: '1h' });
};

const verfiyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const generateVerificationToken = () => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ }, secretKey, { expiresIn: '1h' });
    return token;
  };
  
  const generateResetToken = () => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ }, secretKey, { expiresIn: '1h' });
    return token;
  };

module.exports = {
    generateToken,
    verfiyToken,
    generateVerificationToken,
    generateResetToken
};


