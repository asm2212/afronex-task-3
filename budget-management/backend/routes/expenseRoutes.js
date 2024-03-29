const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware.js');
const expenseService = require('../services/expenseServices.js');

router.use(authenticateUser);

router.get('/expenses', expenseService.getExpenses);
router.post('/expenses', expenseService.createExpenses);
router.put('/expenses:expenseId', expenseService.updateExpenses);
router.delete('/expenses:expenseId', expenseService.deleteExpense);

module.exports = router;