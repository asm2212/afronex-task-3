const User = require('../models/User.js');
const BudgetCategory = require('../models/BudgetCategory.js');
const Expense = require('../models/Expense.js');


exports.getBudgetCategories = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const budgetCategories = await BudgetCategory.find({ user: user._id });
      res.json(budgetCategories);
    } catch (error) {
      res.status(500).send("Server error");
    }
  };


  exports.getTotalExpenses = async(req,res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const expenses = await Expense.find({ user : user._id});
      const totalExpenses = expenses.reduce((total,expense) => total + expense.amount ,0 );
      res.json(totalExpenses);
    
    } catch (error) {
      res.status(500).send("Server error");
    }
  };


exports.generateExpenseReport = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).send("User not found");
        }
        const expenses = await Expense.find({ user : user._id});

        const totalExpenses = expenses.reduce((total,expense) => total + expense.amount ,0 );
        const expenseCategories = {};

        expense.forEach((expense ) => {
            const categoryName = expense.categor.name;
            if(!expenseCategories[categoryName]){
                expenseCategories[categoryName] = expense.amount;
            }else{
                expenseCategories[categoryName] += expense.amount;
            }

        });

        const report = {
            totalExpenses: totalExpenses,
            expenseCategories: expenseCategories,
            numberOfExpenses: expenses.length,
        };
        res.json({report});
        

    }catch(error){
        res.status(500).send("Server error");


    }

};

