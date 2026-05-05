import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRole }) => {
  const userType = localStorage.getItem('userType');

  if (!userType) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userType !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
