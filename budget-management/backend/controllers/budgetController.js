const BudgetCategory = require('../models/BudgetCategory.js');

const addBudgetCategory = async(req,res) => {
    try {
        const {name} = req.body;

        const existingCategory = await BudgetCategory.findOne({name});
        
        if (existingCategory){
            return res.status(400).json({message: 'Category already exists'});
        }
        
        const newCategory = new BudgetCategory({name});
        await newCategory.save();
        
        return res.status(200).json({message: 'Category added successfully', category: newCategory});
        
    } catch (error) {
        console.log('Error during addBudgetCategory', error);
        res.status(500).json({message: 'Server error'});
        
    }



    const updateBudgetCategory = async(req,res) =>{
        try {
            const {id} = req.params;
            const {name} = req.body;

            const updatedCategory = await BudgetCategory.findByIdAndUpdate(id, {name}, {new: true}); 
            
            if (!updatedCategory){
                return res.status(404).json({message: 'Category not found'});
            }
            
            return res.status(200).json({message: 'Category updated successfully', category: updatedCategory});
            
        } catch (error) {
            console.log("Error in updating the budget category", error);
            res.status(500).json({message:"Server Error"})
        }

    }
}

const removeBudgetCategory = async(req,res) => {
     try {
        const {id} = req.params;

        const removedCategory = await BudgetCategory.findByIdAndDelete(id);
        
        if (!removedCategory){
            return res.status(404).json({message: 'Category not found'});
        }
        
        return res.status(200).json({message: 'Category removed successfully', category: removedCategory});
        
     } catch (error) {
        console.log("Error in removing the budget category", error);
        res.status(500).json({message:"Server Error"})
        
     }
};

module.exports = {
    addBudgetCategory,
    removeBudgetCategory,
    updateBudgetCategory
}
