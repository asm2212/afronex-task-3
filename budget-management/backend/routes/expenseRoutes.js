const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authenticateUser = require('../middlewares/authMiddleware.js');
const expenseService = require('../services/expenseServices.js');


router.use(authenticateUser);
/* 
router.get('/expenses', expenseService.getExpenses);
router.post('/expenses', expenseService.createExpense);
router.put('/expenses/:expenseId', expenseService.updateExpense); 
router.delete('/expenses/:expenseId', expenseService.deleteExpense);  */

router.get('/',async(req,res) => {
    try {
        const expenses = await expenseService.getExpenses(req.user.id);
        res.json(expenses); 
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve expenses'});
        
    }
});

router.post('/',
     body('categoryId').notEmpty().withMessage('Please enter a category'),
     body('amount').isFloat({min:0}).withMessage('Amount must be a postive number'),
     body('date').isISO8601().withMessage('Invalid date format'),
     async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newExpense = await expenseService.createExpense(req.user.id, req.body);
            res.json(newExpense);
        } catch (error) {
            res.status(500).json({error: 'Failed to create expense'});
            
        }
     })

router.put('/:id',
          body('categoryId').notEmpty().withMessage('category is required') ,
          body('amount').isFloat({min:0}).withMessage('Amount must be a postive number'),
          body('date').isISO8601().withMessage('Invalid date format'),
          async(req, res) => {
            try{
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const updatedExpense = await expenseService.updateExpense(req.user.id, req.params.id, req.body);
                res.json(updatedExpense);
 
            }
            catch(error){
                res.status(500).json({error: 'Failed to update expense'});
            }
        });

router.delete('/:id', async(req, res) => {
    try {
        const deletedExpense = await expenseService.deleteExpense(req.user.id, req.params.id);
        res.json({message:'expense deleted successfully'})
    } catch (error) {
        res.status(500).json({error: 'Failed to delete expense'});
    }
});

module.exports = router; 
