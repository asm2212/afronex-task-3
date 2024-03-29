
/*const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware.js');
const budgetService = require('../services/budgetServices.js');

router.use(authenticateUser);

router.get('/categories',budgetService.getBudgetCategory);
router.post('/categories',budgetService.createBudgetCategory);
router.put("/categories/:id",budgetService.updateBudgetCategory);
router.delete("/categories/:id",budgetService.deleteBudgetCategory);

module.exports = router;  */


const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware.js');
const budgetService = require('../services/budgetServices.js');

router.use(authenticateUser);

router.post('/categories', async (req, res) => {
  const { name } = req.body;

  const result = await budgetService.addBudgetCategory(name);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await budgetService.updateBudgetCategory(id, name);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
});

router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  const result = await budgetService.removeBudgetCategory(id);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
});

module.exports = router;