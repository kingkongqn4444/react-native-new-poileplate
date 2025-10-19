/**
 * Notification Store - Zustand
 * Global notification system for errors, success messages, warnings, and info
 */

import { create } from 'zustand';
import { showMessage } from 'react-native-flash-message';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  description?: string;
  duration?: number;
}

interface NotificationState {
  // Show notification with FlashMessage
  showNotification: (
    type: NotificationType,
    message: string,
    description?: string,
    duration?: number
  ) => void;

  // Convenience methods
  showError: (message: string, description?: string) => void;
  showSuccess: (message: string, description?: string) => void;
  showWarning: (message: string, description?: string) => void;
  showInfo: (message: string, description?: string) => void;

  // API Error handler
  handleApiError: (error: any, customMessage?: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  showNotification: (type, message, description, duration = 3000) => {
    const config = {
      message,
      description: description || '',
      type: type === 'error' ? 'danger' : type,
      duration,
      floating: true,
      icon: type === 'error' ? 'danger' : type,
    };

    showMessage(config);
  },

  showError: (message, description) => {
    showMessage({
      message,
      description: description || '',
      type: 'danger',
      duration: 4000,
      floating: true,
      icon: 'danger',
      backgroundColor: '#DC2626',
    });
  },

  showSuccess: (message, description) => {
    showMessage({
      message,
      description: description || '',
      type: 'success',
      duration: 3000,
      floating: true,
      icon: 'success',
      backgroundColor: '#16A34A',
    });
  },

  showWarning: (message, description) => {
    showMessage({
      message,
      description: description || '',
      type: 'warning',
      duration: 3500,
      floating: true,
      icon: 'warning',
      backgroundColor: '#F59E0B',
    });
  },

  showInfo: (message, description) => {
    showMessage({
      message,
      description: description || '',
      type: 'info',
      duration: 3000,
      floating: true,
      icon: 'info',
      backgroundColor: '#3B82F6',
    });
  },

  handleApiError: (error, customMessage) => {
    let errorMessage = customMessage || 'Something went wrong';
    let errorDescription = '';

    // Handle Axios errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          errorMessage = 'Bad Request';
          errorDescription = data?.status_message || 'Invalid request parameters';
          break;
        case 401:
          errorMessage = 'Unauthorized';
          errorDescription = 'Invalid API key or authentication failed';
          break;
        case 403:
          errorMessage = 'Forbidden';
          errorDescription = 'You do not have permission to access this resource';
          break;
        case 404:
          errorMessage = 'Not Found';
          errorDescription = 'The requested resource was not found';
          break;
        case 429:
          errorMessage = 'Too Many Requests';
          errorDescription = 'Rate limit exceeded. Please try again later';
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = 'Server Error';
          errorDescription = 'Our servers are experiencing issues. Please try again later';
          break;
        default:
          errorMessage = customMessage || 'Request Failed';
          errorDescription = data?.status_message || `Error code: ${status}`;
      }
    } else if (error.request) {
      // Request made but no response received
      errorMessage = 'Network Error';
      errorDescription = 'Please check your internet connection and try again';
    } else {
      // Something else happened
      errorMessage = customMessage || 'Error';
      errorDescription = error.message || 'An unexpected error occurred';
    }

    showMessage({
      message: errorMessage,
      description: errorDescription,
      type: 'danger',
      duration: 4000,
      floating: true,
      icon: 'danger',
      backgroundColor: '#DC2626',
    });
  },
}));