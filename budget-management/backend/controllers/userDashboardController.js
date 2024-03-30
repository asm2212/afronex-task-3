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