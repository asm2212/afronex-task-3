import axios from 'axios';

export const getBudgetCategories = async() => {
    try{
        const response = await axios.get('/user-dashboard/budget-categories');
        return response.data;
    }catch(error){
        throw error.response.data.message;
    }

};

