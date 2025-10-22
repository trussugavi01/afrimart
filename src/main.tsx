import '@/lib/errorReporter';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css';
import { HomePage } from '@/pages/HomePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { Toaster } from '@/components/ui/sonner';
import { MemberDetailPage } from '@/pages/MemberDetailPage';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/dashboard/overview" replace /> },
      { path: 'overview', element: <DashboardPage /> },
      { path: 'members', element: <DashboardPage /> }, // For simplicity, members link also shows dashboard
      { path: 'members/:id', element: <MemberDetailPage /> },
    ]
  },
  {
    path: '/blog',
    element: <BlogPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/blog/:slug',
    element: <BlogPostPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
    errorElement: <RouteErrorBoundary />,
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster richColors />
    </ErrorBoundary>
  </StrictMode>
);