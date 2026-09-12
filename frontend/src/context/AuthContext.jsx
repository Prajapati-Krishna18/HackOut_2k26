import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '@/constants/roles';

const AuthContext = createContext(null);

const normalizeUser = (userData, assignedRole) => {
  if (!userData) return null;
  const name = userData.full_name || userData.name || (userData.email ? userData.email.split('@')[0] : 'Member');
  const role = (assignedRole || userData.role || USER_ROLES.SUPPLIER).toUpperCase();
  return {
    ...userData,
    name,
    full_name: name,
    email: userData.email || '',
    role,
    avatar_url: userData.avatar_url || null
  };
};

import { authService } from '@/services/api/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('carbonsphere_user');
      const savedRole = localStorage.getItem('carbonsphere_role');
      return savedUser ? normalizeUser(JSON.parse(savedUser), savedRole) : null;
    } catch (e) {
      return null;
    }
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem('carbonsphere_role') || null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('carbonsphere_token') || null;
  });
  const [loading, setLoading] = useState(false);

  // Sync profile from backend on app load if token exists
  useEffect(() => {
    const fetchBackendUser = async () => {
      const activeToken = localStorage.getItem('carbonsphere_token');
      if (!activeToken) return;

      try {
        const res = await authService.getMe();
        if (res?.data?.data?.user || res?.data?.user) {
          const backendUser = res?.data?.data?.user || res?.data?.user;
          const assignedRole = (backendUser.role || role || USER_ROLES.SUPPLIER).toUpperCase();
          const normalized = normalizeUser(backendUser, assignedRole);
          setUser(normalized);
          setRole(assignedRole);
          localStorage.setItem('carbonsphere_user', JSON.stringify(normalized));
          localStorage.setItem('carbonsphere_role', assignedRole);
        }
      } catch (err) {
        console.warn('Backend user profile sync note:', err?.message || err);
      }
    };

    fetchBackendUser();
  }, []);

  const login = (userData, authToken, userRole) => {
    const assignedRole = (userRole || userData?.role || USER_ROLES.SUPPLIER).toUpperCase();
    const normalized = normalizeUser(userData, assignedRole);
    setUser(normalized);
    setToken(authToken);
    setRole(assignedRole);

    localStorage.setItem('carbonsphere_token', authToken);
    localStorage.setItem('carbonsphere_user', JSON.stringify(normalized));
    localStorage.setItem('carbonsphere_role', assignedRole);
  };

  const updateProfile = async (updatedFields) => {
    const merged = normalizeUser({ ...user, ...updatedFields }, role);
    setUser(merged);
    localStorage.setItem('carbonsphere_user', JSON.stringify(merged));

    // Save to backend database
    try {
      const res = await authService.updateProfile(updatedFields);
      if (res?.data?.data?.user || res?.data?.user) {
        const backendUser = res?.data?.data?.user || res?.data?.user;
        const normalized = normalizeUser(backendUser, role);
        setUser(normalized);
        localStorage.setItem('carbonsphere_user', JSON.stringify(normalized));
      }
    } catch (e) {
      console.warn('Backend profile update note:', e?.message || e);
    }
  };

  const selectRole = async (selectedRole) => {
    const assignedRole = (selectedRole || USER_ROLES.SUPPLIER).toUpperCase();
    setRole(assignedRole);
    localStorage.setItem('carbonsphere_role', assignedRole);
    if (user) {
      const updated = normalizeUser({ ...user, role: assignedRole }, assignedRole);
      setUser(updated);
      localStorage.setItem('carbonsphere_user', JSON.stringify(updated));
    }

    // Save to backend database
    try {
      await authService.updateRole(assignedRole);
    } catch (e) {
      console.warn('Backend role update note:', e?.message || e);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('carbonsphere_token');
    localStorage.removeItem('carbonsphere_user');
    localStorage.removeItem('carbonsphere_role');
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        loading,
        isAuthenticated,
        login,
        updateProfile,
        selectRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
