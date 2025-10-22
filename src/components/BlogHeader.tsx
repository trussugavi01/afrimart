import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AfrimartLogo } from '@/components/AfrimartLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore, useUser } from '@/store/auth';
export const BlogHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser();
  const logout = useAuthStore((state) => state.logout);
  const isBlogActive = location.pathname.startsWith('/blog');
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <AfrimartLogo />
          <nav className="space-x-4 flex items-center">
            <Button asChild variant="ghost" className="text-foreground hover:bg-accent">
              <Link to="/">Home</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn(
                'hover:bg-accent',
                isBlogActive ? 'text-brand font-semibold' : 'text-foreground'
              )}
            >
              <Link to="/blog">Blog</Link>
            </Button>
            {user ? (
              <>
                <Button asChild variant="outline">
                  <Link to="/dashboard">
                    {user.role === 'Admin' ? `Admin: ${user.fullName.split(' ')[0]}` : 'Member Area'}
                  </Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild variant="outline">
                <Link to="/login">Member Login</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};