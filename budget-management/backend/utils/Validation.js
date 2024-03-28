const nodemailer = require('nodemailer');

const sendVerificationEmail = (email, token) => {
  // Create a transporter using SMTP or other transport options
  const transporter = nodemailer.createTransport({
    // Configure your email provider here (e.g., Gmail, SendGrid, etc.)
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  // Compose the email message
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: ${token}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};

const sendPasswordResetEmail = (email, token) => {
  // Create a transporter using SMTP or other transport options
  const transporter = nodemailer.createTransport({
    // Configure your email provider here (e.g., Gmail, SendGrid, etc.)
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  // Compose the email message
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${token}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending password reset email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};