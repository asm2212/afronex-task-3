
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth';

const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  verifyEmail: async (token) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { token });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  resetPassword: async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
};

export default authService;
