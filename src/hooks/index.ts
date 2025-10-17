import { useAuthStore, useUserStore, useSettingsStore } from '../stores';
import { useCallback } from 'react';

// Auth hooks
export const useAuth = () => {
  const authStore = useAuthStore();
  
  return {
    ...authStore,
    // Convenience methods
    isLoggedIn: authStore.isAuthenticated,
    currentUser: authStore.user,
  };
};

export const useLogin = () => {
  const { login, isLoading, error } = useAuthStore();
  
  const handleLogin = useCallback(async (email: string, password: string) => {
    await login(email, password);
  }, [login]);
  
  return {
    login: handleLogin,
    isLoading,
    error,
  };
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);
  
  return { logout: handleLogout };
};

// User hooks
export const useUser = () => {
  const userStore = useUserStore();
  
  return {
    ...userStore,
    // Convenience methods
    hasUser: !!userStore.user,
  };
};

export const useUserProfile = () => {
  const { user, updateUser, isLoading, error } = useUserStore();
  
  const updateProfile = useCallback(async (userData: Partial<typeof user>) => {
    if (user) {
      updateUser(userData);
    }
  }, [user, updateUser]);
  
  return {
    user,
    updateProfile,
    isLoading,
    error,
  };
};

// Settings hooks
export const useSettings = () => {
  const settingsStore = useSettingsStore();
  
  return {
    ...settingsStore,
    // Convenience methods
    isDarkMode: settingsStore.theme === 'dark',
    isLightMode: settingsStore.theme === 'light',
    isSystemTheme: settingsStore.theme === 'system',
  };
};

export const useTheme = () => {
  const { theme, toggleTheme, updateSettings } = useSettingsStore();
  
  const setTheme = useCallback((newTheme: 'light' | 'dark' | 'system') => {
    updateSettings({ theme: newTheme });
  }, [updateSettings]);
  
  return {
    theme,
    toggleTheme,
    setTheme,
  };
};

export const useNotifications = () => {
  const { notifications, toggleNotification, updateSettings } = useSettingsStore();
  
  const updateNotifications = useCallback((newNotifications: Partial<typeof notifications>) => {
    updateSettings({ notifications: { ...notifications, ...newNotifications } });
  }, [notifications, updateSettings]);
  
  return {
    notifications,
    toggleNotification,
    updateNotifications,
  };
};

// Combined hooks for common use cases
export const useAppState = () => {
  const auth = useAuth();
  const user = useUser();
  const settings = useSettings();
  
  return {
    auth,
    user,
    settings,
    isReady: !auth.isLoading && !user.isLoading,
  };
};
