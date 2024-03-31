const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/Validation.js');

class AuthService {
    // Register a new user
    async register(user) {
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
    }

    // Log in an existing user
    async login(credentials) {
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
    }

    // Verify email of a user
    async verifyEmail(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = decoded;

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.isEmailVerified = true;
        await user.save();

        return user;
    }

    // Send password reset email to a user
    async forgotPassword(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        await sendPasswordResetEmail(user, token);

        return true;
    }

    // Reset password of a user
    async resetPassword(token, newPassword) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = decoded;

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return { message: 'Password has been reset' };
    }
}

module.exports = new AuthService();