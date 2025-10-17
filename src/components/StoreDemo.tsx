import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuthStore, useSettingsStore, useUserStore } from '../stores';
import { useAuth, useSettings } from '../hooks';

export const StoreDemo: React.FC = () => {
  const authStore = useAuthStore();
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();
  
  const { theme, toggleTheme } = useSettings();

  const showStoreState = () => {
    Alert.alert(
      'Store State',
      `Auth: ${JSON.stringify({
        isAuthenticated: authStore.isAuthenticated,
        hasUser: !!authStore.user,
        hasToken: !!authStore.token,
        isLoading: authStore.isLoading,
        error: authStore.error,
      }, null, 2)}
      
Settings: ${JSON.stringify({
        theme: settingsStore.theme,
        language: settingsStore.language,
        notifications: settingsStore.notifications,
      }, null, 2)}
      
User: ${JSON.stringify({
        hasUser: !!userStore.user,
        isLoading: userStore.isLoading,
        error: userStore.error,
      }, null, 2)}`
    );
  };

  const testLogin = async () => {
    try {
      await authStore.login('demo@example.com', 'password123');
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  const testLogout = () => {
    authStore.logout();
    Alert.alert('Success', 'Logged out!');
  };

  const testThemeToggle = () => {
    toggleTheme();
    Alert.alert('Success', `Theme changed to: ${theme}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Store Demo</Text>
      
      <TouchableOpacity style={styles.button} onPress={showStoreState}>
        <Text style={styles.buttonText}>Show Store State</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testLogin}>
        <Text style={styles.buttonText}>Test Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testLogout}>
        <Text style={styles.buttonText}>Test Logout</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testThemeToggle}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
