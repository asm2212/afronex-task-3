const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware.js');
const budgetService = require('../services/budgetServices.js');

router.use(authenticateUser);

router.get('/categories',budgetService.getBudgetCategory);
router.post('/categories',budgetService.createBudgetCategory);
router.put("/categories/:id",budgetService.updateBudgetCategory);
router.delete("/categories/:id",budgetService.deleteBudgetCategory);

module.exports = router;