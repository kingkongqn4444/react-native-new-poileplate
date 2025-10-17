import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, SettingsActions } from '../types';

interface SettingsStore extends AppSettings, SettingsActions {}

const defaultSettings: AppSettings = {
  theme: 'system',
  language: 'en',
  notifications: {
    push: true,
    email: true,
    sms: false,
  },
  privacy: {
    analytics: true,
    crashReporting: true,
  },
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      ...defaultSettings,

      updateSettings: (newSettings: Partial<AppSettings>) => {
        set((state) => ({
          ...state,
          ...newSettings,
        }));
      },

      resetSettings: () => {
        set(defaultSettings);
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
        set({ theme: newTheme });
      },

      toggleNotification: (type: keyof AppSettings['notifications']) => {
        set((state) => ({
          notifications: {
            ...state.notifications,
            [type]: !state.notifications[type],
          },
        }));
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
