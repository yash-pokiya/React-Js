import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-bg">
        <Spinner size="lg" />
      </div>
    );
  }

  return isLoggedIn && isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
