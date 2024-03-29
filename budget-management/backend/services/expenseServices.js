const {BudgetCategory} = require('../models/BudgetCategory.js')
const {Expense} = require('../models/Expense.js');

class ExpenseService {
    async getExpenses(userId) {
        const expenses = await Expense.find({userId: userId}).populate(category);
        return expenses;
    }

    async createExpenses(userId,expenseData) {
        const {categoryId,amount,data} = expenseData;

        const category = await BudgetCategory.findById(categoryId);
        if(!category){
            throw new Error ('Budget category not found');
        }
         const newExpense = await Expense.create({userId, categoryId,date,amount});
         return newExpense;
    }

    async updateExpenses(userId,expenseId,expenseData){
        const {categoryId,amount,data} = expenseData;

        const category = await BudgetCategory.findById(categoryId);
        if(!category){
            throw new Error ('Budget category not found');
        }

        const updatedExpense = await Expense.findByIdAndUpdate({_id: expenseId,userId},
            { categoryId,date,amount},
            {new: true}
            );
        return updatedExpense;
    }
    async deleteExpenses(userId,expenseId){
        const deletedExpense = await Expense.findByIdAndDelete({_id: expenseId,userId});
        return true;
    }
}

module.exports = new ExpenseService();