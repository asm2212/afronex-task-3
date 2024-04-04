import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

// Component names should start with an uppercase letter
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
