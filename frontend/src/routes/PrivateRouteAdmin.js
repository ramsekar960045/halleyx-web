import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRouteAdmin = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return user.role === 'admin' ? children : <Navigate to="/dashboard" />;
};

export default PrivateRouteAdmin;