const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware.js');
const reportServices = require('../services/reportServices.js');
const checkRole = require('../middlewares/roleMiddleware.js');

router.use(authenticateUser);

router.get('/budgetReport',reportServices.generateBudgetReport);
router.get('/expenseReport',checkRole('admin'),reportServices.generateExpenseReport);

module.exports = router;