/**
 * Color Palette
 */

export const colors = {
  // Primary Colors
  primary: '#2196F3',
  primaryDark: '#1976D2',
  primaryLight: '#E3F2FD',

  // Secondary Colors
  secondary: '#03A9F4',
  secondaryDark: '#0288D1',
  secondaryLight: '#B3E5FC',

  // Accent Colors
  accent: '#FF5722',
  accentDark: '#E64A19',
  accentLight: '#FFCCBC',

  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',

  // Gray Scale
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  // Text Colors
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#999999',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#FAFAFA',
    dark: '#212121',
  },

  // Border Colors
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#757575',
  },

  // Overlay Colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.3)',
    dark: 'rgba(0, 0, 0, 0.5)',
    darker: 'rgba(0, 0, 0, 0.7)',
  },
};

export type Colors = typeof colors;