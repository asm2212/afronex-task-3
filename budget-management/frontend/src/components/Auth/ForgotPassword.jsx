

import React, { useState } from 'react';
import authService from '../../services/authService.jsx';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.forgotPassword(email);
      console.log(response); 
    } catch (error) {
      console.error(error.message); 
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={handleChange} placeholder="Email" />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
