// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from './Loader';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Show a branded loading screen while checking authentication status
  if (loading) {
    return <Loader fullScreen text="Preparing your campus market..." />;
  }

  // If user is logged in, render child routes (Outlet), otherwise redirect to /login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
