import { create } from "zustand";
import { persist } from "zustand/middleware";
import { iUser } from "./types";

interface AuthStore {
    token: string | null;
    user: iUser | null;
    loginSuccess: (data: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            loginSuccess: (data: any) => set({ token: data.token, user: data.user }),
            logout: () => set({ token: null, user: null })
        }),
        {
            name: 'auth-storage'
        }
    )
)
