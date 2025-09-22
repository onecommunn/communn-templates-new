'use client';

// import { createContext, useState } from "react";
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from './Auth.context';
import { useEffect, useMemo } from 'react';

const AuthProvider = ({ children }: any) => {
  const {
    loading,
    user,
    isAuthenticated,
    getAccessToken,
    autoLogin,
    autoCreate,
    roleType
  } = useAuth();

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    loading,
    user,
    isAuthenticated,
    getAccessToken,
    autoLogin,
    autoCreate,
    roleType
  }), [loading, user, isAuthenticated, getAccessToken, autoLogin, autoCreate, roleType]);

  // Log only when values actually change
  useEffect(() => {
    // console.log('AuthProvider State Update:', {
    //   loading,
    //   user: user ? 'User exists' : 'No user',
    //   isAuthenticated
    // });
  }, [loading, user, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
