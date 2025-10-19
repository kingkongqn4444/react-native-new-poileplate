import { useAuthStore } from '../stores';

// API utility functions
export const createApiClient = () => {
  const { token } = useAuthStore.getState();
  
  const baseHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    baseHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  return {
    get: async (url: string) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: baseHeaders,
      });
      return response.json();
    },
    
    post: async (url: string, data: any) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: baseHeaders,
        body: JSON.stringify(data),
      });
      return response.json();
    },
    
    put: async (url: string, data: any) => {
      const response = await fetch(url, {
        method: 'PUT',
        headers: baseHeaders,
        body: JSON.stringify(data),
      });
      return response.json();
    },
    
    delete: async (url: string) => {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: baseHeaders,
      });
      return response.json();
    },
  };
};

// Storage utilities
export const storageKeys = {
  AUTH: 'auth-storage',
  USER: 'user-storage',
  SETTINGS: 'settings-storage',
} as const;

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Theme utilities
export const getThemeColors = (theme: 'light' | 'dark' | 'system') => {
  const isDark = theme === 'dark' || (theme === 'system' && false); // You can implement system theme detection
  
  return {
    primary: isDark ? '#007AFF' : '#007AFF',
    secondary: isDark ? '#5856D6' : '#5856D6',
    background: isDark ? '#000000' : '#FFFFFF',
    surface: isDark ? '#1C1C1E' : '#F2F2F7',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#8E8E93' : '#6D6D70',
    border: isDark ? '#38383A' : '#C6C6C8',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  };
};
