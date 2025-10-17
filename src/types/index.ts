// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

// App settings types
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReporting: boolean;
  };
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Store action types
export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export interface UserActions {
  updateUser: (userData: Partial<User>) => void;
  clearUser: () => void;
}

export interface SettingsActions {
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
  toggleTheme: () => void;
  toggleNotification: (type: keyof AppSettings['notifications']) => void;
}

// Combined store types
export interface RootState {
  auth: AuthState;
  user: User | null;
  settings: AppSettings;
}

export interface RootActions extends AuthActions, UserActions, SettingsActions {}
