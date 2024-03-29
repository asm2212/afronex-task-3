const Expense = require('../models/Expense.js');

const addExpense = async(req,res) => {
    try {
        const {amount,date,category} = req.body;
        const newExpense = new Expense({amount,date,category});
        await newExpense.save();

        res.status(200).json({message: 'Expense added successfully',expense: newExpense});
        
    } catch (error) {
        console.log("Error in addExpense", error);
        res.status(500).json({message: 'Server Error' });
        
    }
}

const updateExpense = async(req,res)=>{
    try {
        const {id} = req.params;
        const {amount,date,category} = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(id,{amount,date,category},{new:true});

        if(!updatedExpense){
            return res.status(404).json({message:'No expense with the given ID was found.'})
        }
        res.status(200).json({message: 'Expense updated successfully',expense: updatedExpense});
        
    } catch (error) {
        console.log("Error in updateExpense", error);
        res.status(500).json({message: 'Server Error' });
        
    }
}

const deleteExpense = async(req,res)=>{
    try {
        const {id} = req.params;
        const deletedExpense = await Expense.findOneAndDelete({_id : id});

        if(!deletedExpense){
            return res.status(404).json({message:"No record of this expense exists."})
        }
        res.status(200).json({message:"Expense has been removed" , expense : deletedExpense })
    }catch(error){
        console.log('Error in deleteExpense ', error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getExpenseByCategory = async(req,res) => {
    try {
        const {category} = req.params;
        const expense = await Expense.find({category});
        res.status(200).json({message: 'Expense fetched successfully',expense});
        
    } catch (error) {
        console.log("Error in getExpenseByCategory", error);
        res.status(500).json({message: 'Server Error' });
        
    }
}

module.exports = {
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseByCategory
}