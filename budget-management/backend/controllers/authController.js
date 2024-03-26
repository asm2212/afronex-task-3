const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

async function signup(req, res, next) {
    const { username, password } = req.body;
 
    try {
        const existingUser = User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User ({ username,password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'user has been created' });
    } catch (error) {
        console.log('Error during signup' , error);
        res.status(500).json({ message: 'server error' });
        
    }
}