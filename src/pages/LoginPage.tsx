import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AfrimartLogo } from '@/components/AfrimartLogo';
import { useAuthStore } from '@/store/auth';
import { members } from '@/lib/data';
import { toast } from 'sonner';
export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    // Mock validation: find user and check password/role
    const user = members.find((m) => m.email === email);
    // For this demo, we'll use a hardcoded password for all admins and managers.
    if (user && (user.role === 'Admin' || user.role === 'Manager') && password === 'password123') {
      login({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      });
      toast.success(`Welcome back, ${user.fullName}!`);
      navigate('/dashboard');
    } else if (user && user.role !== 'Admin' && user.role !== 'Manager') {
      toast.error('Access Denied. Only admins and managers can log in.');
    } else {
      toast.error('Invalid email or password.');
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AfrimartLogo />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your admin credentials below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@afrimart.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-brand hover:bg-green-600 text-white">
              Login
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Not an admin?{' '}
            <Link to="/signup" className="underline">
              Sign up as a member
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}