const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const nodemailer = require("nodemailer");



const signup = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'U.sername already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User has been created' });
    } catch (error) {
        console.log('Error during signup', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const signin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
         const user = await User.findOne({ username });
         if (!user) {
             return res.status(400).json({ message: 'Username does not exist' });
         }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
              return res.status(400).json({ message: 'Password does not match' });
          }
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, 
            { expiresIn: '1h' });

            res.status(200).json({ token: token});


    } catch (error) {
        console.log("Error in signin", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const verfiyEmail = async(req, res, next) => {
    try {
        
        const {verficationToken} = req.params;
        const user = await User.findOne({verficationToken});

        if (!user) {
            return res.status(400).json({ message: 'Invalid verfication token' });
        }
        user.emailVerification = true;
        user.verificationToken = null;
        await user.save();
        res.status(200).json({ message: 'Email has been verified' });
    } catch (error) {
        console.log("Error in verfiyEmail", error);
        res.status(500).json({ message: 'Server Error' });
        
    }
} 

const forgotPassword = async(req,res,next) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ message: ' email not found' });
        }
        
        const resetToken = generateResetToken();
        user.resetToken = resetToken;
        await user.save();

        sendResetTokenEmail(user.email,resetToken);
        res.status(200).json({ message: 'Reset token sent to your email address' });
    } catch (error) {
        console.log("Error in forgotPassword", error);
        res.status(500).json({ message: 'Server Error' });
        
    }
}


const generateResetToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE, 
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  
  const sendResetTokenEmail = async (email, resetToken) => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Password Reset Request",
        html: `<p>Please click the following link to reset your password:</p>
             <a href="${process.env.BASE_URL}/api/auth/reset-password/${resetToken}"
             target="_blank">${process.env.BASE_URL}/api/auth/reset-password/${resetToken}</a>
             <p>This link will expire in 1 hour.</p>
             <p>If you did not request a password reset, please ignore this email.</p>
             <p>Best regards,</p>
             <p>The Afronex Budget Management Team</p>`,
      });
  
      console.log(`Reset password email sent to: ${email}`);
    } catch (error) {
      console.error(`Error sending reset password email to: ${email}`, error);
      throw error;
    }
  };

  
  module.exports = {
    signup,
    signin,
    verifyEmail,
    forgotPassword,
    sendResetTokenEmail,
  };

