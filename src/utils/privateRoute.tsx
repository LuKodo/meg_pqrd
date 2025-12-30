import { Redirect } from 'wouter';
import { useAuth } from '@/features/shared/context/AuthContext';
import * as React from 'react';

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated ? children : <Redirect to="/login" />
    );
};

export { PrivateRoute };
