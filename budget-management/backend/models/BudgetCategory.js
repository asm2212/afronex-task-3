const mongoose = require('mongoose');

const BudgetCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('BudgetCategory', BudgetCategorySchema);