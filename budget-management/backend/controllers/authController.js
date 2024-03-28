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

const transporter = nodemailer.createTransport(process.env.EMAIL_CONFIG);


 const sendResetTokenEmail = async(email,resetToken) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'reset password',
            text: `Enter this code in the input field to reset your password: ${resetToken}`,
        });
        console.log(`Reset token sent to: ${email}`);
        
    } catch (error) {
        console.log("Error in sendResetTokenEmail", error);
        throw error;
    
        
    }
 };




module.exports = {
    signup,
    signin,
    verfiyEmail,
    forgotPassword,
    sendResetTokenEmail
    
};
