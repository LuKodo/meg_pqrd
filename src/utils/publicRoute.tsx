import { useAuth } from '@/features/shared/context/AuthContext';
import * as React from 'react';
import { Redirect } from 'wouter';

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? children : <Redirect to="/home" />;
};

export { PublicRoute };
