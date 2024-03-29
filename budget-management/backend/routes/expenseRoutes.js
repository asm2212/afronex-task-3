const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware.js');
const expenseService = require('../services/expenseServices.js');

router.use(authenticateUser);

router.get('/expenses', expenseService.getExpenses);
router.post('/expenses', expenseService.createExpense);
router.put('/expenses/:expenseId', expenseService.updateExpense); 
router.delete('/expenses/:expenseId', expenseService.deleteExpense); 

module.exports = router; 
