const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const {generateToken} = require('../config/jwt.js');

const register = async(req, res) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email });
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password: hashedPassword
        });
        await user.save();

        const verificationToken = generateVerficationToken();

        user.emailVerificationToken = verificationToken;
        user.emailVerificationExpires = Date.now() + 360000000000; //1h
        await user.save();

        sendVerificationEmail(user.email,verificationToken);

        res.status(201).json({message: 'User registered successfully'});
        
    } catch (error) {
        console.log('error in register', error);
        res.status(500).json({message: 'Server error'});    
    }
}



const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = generateToken({userId : user._id});
        res.status(200).json({token});
    } catch (error) {
        console.log("Error in Login:", error);
        res.status(500).json({message: 'Server error'}); 
    }
}

const verifyEmail = async(req, res) => {
   try{
       const {token} = req.params;
       const user = await User.findOne({emailVerificationToken: token,
        emailVerificationExpires: {$gt: Date.now()}});
       if (!user) {
        return res.status(400).json({message: 'Invalid or expire verfication token'});
       }
       user.emailVerificationToken = undefined;
       user.emailVerificationExpires = undefined;
       user.isEmailVerified=true;
       await user.save();

       res.status(200).json({message: 'Email verified successfully'});
       }catch(error){
           console.log('Error in Verify Email', error);
           res.status(500).json({message:'Internal server error'})
       }
};
   


const forgotPassword = async(req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const resetToken = generateResetToken();

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 360000000000
        await user.save();

        sendPasswordResetEmail(user.email, resetToken);

        res.status(200).json({message: "reset password email sent successfully"})
        
    } catch (error) {
        console.log("Error in forgotPassword", error);
        res.status(500).json({message: 'Server error'})
        
    }
}
/*  const resetPassword = async(req,res) => {
    try{
        
    }catch(error){

    }

}  */

module.exports ={
    register,
    login,
    verifyEmail,
    forgotPassword
}




