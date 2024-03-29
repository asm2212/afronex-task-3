const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware.js');
const reportServices = require('../services/reportServices.js');

router.use(authenticateUser);

router.get('/budgetReport',reportServices.generateBudgetReport);
router.get('/expenseReport',reportServices.generateExpenseReport);

module.exports = router;