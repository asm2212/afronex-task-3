const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const userDashboardController = require('../controllers/userDashboardController.js');

router.get('/budget-categories', authMiddleware, userDashboardController.getBudgetCategories);
router.get('/total-expenses', authMiddleware, userDashboardController.getTotalExpenses);
router.get('/expense-report', authMiddleware, userDashboardController.generateExpenseReport);

module.exports = router;