
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth  from '../hooks/useAuth.jsx';

const AdminRoute = ({ component: Component, ...rest }) => {
 
const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;
