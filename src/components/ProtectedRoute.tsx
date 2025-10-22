import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.user);
  if (!user || user.role !== 'Admin') {
    // Redirect them to the /login page if not authenticated or not an admin.
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};