const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

router.get('/', budgetController.getBudgets);
router.post('/', budgetController.createBudget);

module.exports = router;