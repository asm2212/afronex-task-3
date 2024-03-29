
const BudgetCategory = require('../models/BudgetCategory.js');

class budgetService {
  async addBudgetCategory(name) {
    try {
      const existingCategory = await BudgetCategory.findOne({ name });

      if (existingCategory) {
        return { success: false, message: 'Category already exists' };
      }

      const newCategory = new BudgetCategory({ name });
      await newCategory.save();

      return { success: true, message: 'Category added successfully', category: newCategory };
    } catch (error) {
      console.log('Error during addBudgetCategory', error);
      return { success: false, message: 'Server error' };
    }
  }

  async updateBudgetCategory(id, name) {
    try {
      const updatedCategory = await BudgetCategory.findByIdAndUpdate(id, { name }, { new: true });

      if (!updatedCategory) {
        return { success: false, message: 'Category not found' };
      }

      return { success: true, message: 'Category updated successfully', category: updatedCategory };
    } catch (error) {
      console.log('Error in updating the budget category', error);
      return { success: false, message: 'Server error' };
    }
  }

  async removeBudgetCategory(id) {
    try {
      const removedCategory = await BudgetCategory.findByIdAndDelete(id);

      if (!removedCategory) {
        return { success: false, message: 'Category not found' };
      }

      return { success: true, message: 'Category removed successfully', category: removedCategory };
    } catch (error) {
      console.log('Error in removing the budget category', error);
      return { success: false, message: 'Server error' };
    }
  }
}

module.exports = new budgetService();