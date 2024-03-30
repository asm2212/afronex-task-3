import axios from 'axios';

export const getBudgetCategories = async() => {
    try{
        const response = await axios.get('/user-dashboard/budget-categories');
        return response.data;
    }catch(error){
        throw error.response.data.message;
    }

};

export const getTotalExpenses = async() => {
    try{
        const response = await axios.get('/user-dashboard/total-expenses');
        return response.data.totalExpenses;
    }catch(error){
        throw error.response.data.message;
    }
};

export const generateExpenseReport = async() => {
    try{
        const response = await axios.get('/user-dashboard/expense-report');
        return response.data;
    }catch(error){
        throw error.response.data.message;
    }
};

