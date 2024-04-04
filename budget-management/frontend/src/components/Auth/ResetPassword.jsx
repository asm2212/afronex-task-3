

import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import authService from '../../services/authService.jsx';

const ResetPassword = () => {
  const { token } = useParams(); 
  const [newPassword, setNewPassword] = useState('');

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.resetPassword(token, newPassword);
      console.log(response); 
    } catch (error) {
      console.error(error.message); 
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" value={newPassword} onChange={handleChange} placeholder="New Password" />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
