import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const RoleRoute = ({ allowedRoles = [] }) => {
  const { role } = useAuth();

  const userRole = (role || '').toUpperCase();
  const normalizedAllowed = allowedRoles.map((r) => r.toUpperCase());

  if (!userRole || !normalizedAllowed.includes(userRole)) {
    // Redirect to role selection if role is not authorized for this workspace
    return <Navigate to="/role-selection" replace />;
  }

  return <Outlet />;
};
