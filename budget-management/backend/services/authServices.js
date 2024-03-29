const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/Validation.js');

class AuthService {
    async register(user) {
        try {
            const { email, password } = user;

            
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }

        
            const hashedPassword = await bcrypt.hash(password, 10);

        
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();

        
            await sendVerificationEmail(newUser);

            return newUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login(credentials) {
        try {
            const { email, password } = credentials;

        
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }

    
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            return { token };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async verifyEmail(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;

        
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

        
            user.isEmailVerified = true;
            await user.save();

            return user;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    async forgotPassword(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

        
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

        
            await sendPasswordResetEmail(user, token);

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async resetPassword(token, newPassword) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;

        
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

    
            const hashedPassword = await bcrypt.hash(newPassword, 10);

        
            user.password = hashedPassword;
            await user.save();

            return { message: 'Password has been reset' };
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = new AuthService();
