const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware.js');
const usersController = require('../controllers/budgetController.js');

router.get('/', authenticateToken, usersController.getAllUsers);
router.get('/:id', authenticateToken, usersController.getUserById);
