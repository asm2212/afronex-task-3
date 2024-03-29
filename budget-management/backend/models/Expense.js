const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BudgetCategory',
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    });
    
module.exports = mongoose.model('Expense', expenseSchema);