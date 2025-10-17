import React, { useEffect } from 'react';
import { useAuthStore, useUserStore } from '../stores';
import { useAuth, useUser } from '../hooks';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const { refreshToken, logout } = useAuthStore();
  const { user: authUser } = useAuth();
  const { user: storeUser, clearUser } = useUser();

  // Sync auth user with user store
  useEffect(() => {
    if (authUser && !storeUser) {
      // User logged in, sync to user store
      useUserStore.getState().updateUser(authUser);
    } else if (!authUser && storeUser) {
      // User logged out, clear user store
      clearUser();
    }
  }, [authUser, storeUser, clearUser]);

  // Auto refresh token on app start
  useEffect(() => {
    const { token, refreshToken: storedRefreshToken } = useAuthStore.getState();
    
    if (token && storedRefreshToken) {
      // Check if token is expired and refresh if needed
      refreshToken();
    }
  }, [refreshToken]);

  return <>{children}</>;
};

// Store initialization utility
export const initializeStores = async () => {
  try {
    // Initialize any stores that need async setup
    console.log('Stores initialized successfully');
  } catch (error) {
    console.error('Failed to initialize stores:', error);
  }
};
