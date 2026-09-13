import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/constants/roles';

export const RoleRoute = ({ allowedRoles = [] }) => {
  const { role } = useAuth();

  const userRole = (role || '').toUpperCase();
  const normalizedAllowed = allowedRoles.map((r) => r.toUpperCase());

  if (!userRole || !normalizedAllowed.includes(userRole)) {
    // Graceful role redirection based on authenticated persona
    if (userRole === USER_ROLES.BUYER) {
      return <Navigate to="/buyer/dashboard" replace />;
    }
    if (userRole === USER_ROLES.SUPPLIER) {
      return <Navigate to="/supplier/dashboard" replace />;
    }
    if (userRole === USER_ROLES.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/role-selection" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
