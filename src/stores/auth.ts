import { create } from "zustand";
import { persist } from "zustand/middleware";
type AuthStore = {
  isAuth: boolean;
  client: null | ClientData;
  error: unknown;
  setAuth: ({
    isAuth,
    client,
    error,
  }: {
    isAuth: boolean;
    client: null | ClientData;
    error: unknown;
  }) => void;
};

export const useAuthStore = create(
  persist<AuthStore>((set) => ({
    isAuth: false,
    client: null,
    error: null,
    setAuth: ({ isAuth, client, error }) => set({ isAuth, client, error }),
  }),
  {
    name: 'auth',
  }
)
);
