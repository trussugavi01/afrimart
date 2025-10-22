import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AfrimartLogo } from '@/components/AfrimartLogo';
import { Button } from '@/components/ui/button';
import { useAuthStore, useUser } from '@/store/auth';
import { toast } from 'sonner';
import { LayoutDashboard, Users, LogOut, Home, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
const Sidebar = () => {
  const user = useUser();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.");
    navigate('/login');
  };
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
      isActive
        ? "bg-brand/10 text-brand"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    );
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r flex flex-col">
      <div className="px-6 py-4 border-b">
        <AfrimartLogo />
      </div>
      <div className="flex-1 p-4 space-y-2">
        <nav className="space-y-1">
          <NavLink to="/dashboard" end className={navLinkClass}>
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/members" className={navLinkClass}>
            <Users className="mr-3 h-5 w-5" />
            Members
          </NavLink>
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="p-4 rounded-lg bg-gray-50 text-center mb-4">
          <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
        <div className="space-y-2">
           <Button variant="ghost" className="w-full justify-start text-gray-600" asChild>
            <Link to="/">
              <Home className="mr-3 h-5 w-5" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600" asChild>
            <Link to="/blog">
              <BookOpen className="mr-3 h-5 w-5" />
              Blog
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600" onClick={handleLogout}>
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};
export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto relative">
          <div className="absolute inset-0 bg-fluid -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}