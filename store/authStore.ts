import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    name: string;
    email: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    login: (name: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            login: (name) => set({ isLoggedIn: true, user: { name, email: '' } }),
            logout: () => set({ isLoggedIn: false, user: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
