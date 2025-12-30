import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type iUser } from "./types";

interface AuthStore {
    token: string | null;
    user: iUser | null;
    setToken: (token: string) => void;
    setUser: (user: iUser) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setToken: (token: string) => set({ token }),
            setUser: (user: iUser) => set({ user }),
            logout: () => set({ token: null, user: null })
        }),
        {
            name: 'auth-storage'
        }
    )
)
