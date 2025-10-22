import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Member } from '@/lib/schema';
type User = Pick<Member, 'id' | 'fullName' | 'email' | 'role'>;
interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
// Selector for convenience
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user);
export const useUser = () => useAuthStore((state) => state.user);