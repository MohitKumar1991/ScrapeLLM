import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  jwt: string | null;
  email: string | null;
  setJwt: (j: string) => void;
  setEmail: (e: string) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        jwt: null,
        email: null,
        setJwt: (j: string) => set((state) => ({ ...state, jwt: j })),
        setEmail: (e: string) => set((state) => ({ ...state, email: e })),
      }),
      {
        name: 'auth-store',
      },
    ),
  ),
);
