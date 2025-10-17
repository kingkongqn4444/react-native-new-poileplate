import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserActions } from '../types';

interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface UserStoreActions extends UserActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserStore & UserStoreActions>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        set({
          user: { ...user, ...userData },
        });
      },

      clearUser: () => {
        set({
          user: null,
          error: null,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
