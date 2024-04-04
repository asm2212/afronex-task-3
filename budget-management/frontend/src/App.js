

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import AdminRoute from './Routes/AdminRoute.jsx';
import Login from './components/Auth/Login.jsx';
import Registration from './components/Auth/Registration.jsx';
import ForgotPassword from './components/Auth/ForgotPassword.jsx';
import ResetPassword from './components/Auth/ResetPassword.jsx';
import Dashboard from './components/Dashboard/Overview.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:token" component={ResetPassword} />

        {/* Protected Routes */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        
        {/* Admin Routes */}
        <AdminRoute path="/admin" component={AdminDashboard} />
        
   {/*      <Route exact path="/" component={Home} />
        <Route component={NotFound} />}   */}
      </Routes>
    </Router>
  );
};

export default App;
