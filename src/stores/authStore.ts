import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, AuthActions, User, ApiResponse } from '../types';

interface AuthStore extends AuthState, AuthActions {}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...defaultAuthState,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call - replace with actual API
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data: ApiResponse<{ user: User; token: string; refreshToken: string }> = await response.json();

          if (data.success && data.data) {
            set({
              isAuthenticated: true,
              user: data.data.user,
              token: data.data.token,
              refreshToken: data.data.refreshToken,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: data.message || 'Login failed',
            });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Network error',
          });
        }
      },

      register: async (userData: Partial<User> & { password: string }) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });

          const data: ApiResponse<{ user: User; token: string; refreshToken: string }> = await response.json();

          if (data.success && data.data) {
            set({
              isAuthenticated: true,
              user: data.data.user,
              token: data.data.token,
              refreshToken: data.data.refreshToken,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: data.message || 'Registration failed',
            });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Network error',
          });
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          refreshToken: null,
          error: null,
        });
      },

      updateProfile: async (userData: Partial<User>) => {
        const { user, token } = get();
        if (!user || !token) return;

        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          });

          const data: ApiResponse<User> = await response.json();

          if (data.success && data.data) {
            set({
              user: data.data,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: data.message || 'Update failed',
            });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Network error',
          });
        }
      },

      refreshToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return;

        try {
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          const data: ApiResponse<{ token: string; refreshToken: string }> = await response.json();

          if (data.success && data.data) {
            set({
              token: data.data.token,
              refreshToken: data.data.refreshToken,
            });
          } else {
            // Refresh failed, logout user
            get().logout();
          }
        } catch (error) {
          // Refresh failed, logout user
          get().logout();
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
