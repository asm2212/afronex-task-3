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

        res.status(210).json({message: 'User registered successfully'});
        
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







