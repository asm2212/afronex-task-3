const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware.js');
const reportServices = require('../services/reportServices.js');
const checkRole = require('../middlewares/roleMiddleware.js');

router.use(authenticateUser);

router.get('/budgetReport', (req, res) => {
  reportServices.generateBudgetReport(req, res);
});

router.get('/expenseReport', checkRole('admin'), (req, res) => {
  reportServices.generateExpenseReport(req, res);
});

module.exports = router;