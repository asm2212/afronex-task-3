const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const signup = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
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

module.exports = {
    signup,
    signin
};
