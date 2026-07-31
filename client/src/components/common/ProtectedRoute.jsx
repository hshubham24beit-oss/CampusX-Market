// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // or useContext(AuthContext)

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Show a loading screen while checking authentication status
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // If user is logged in, render child routes (Outlet), otherwise redirect to /login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}