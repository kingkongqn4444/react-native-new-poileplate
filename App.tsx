/**
 * React Native App with Zustand Store Integration
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider, initializeStores } from './src/stores/StoreProvider';
import { useAuth, useSettings, useTheme } from './src/hooks';
import { getThemeColors } from './src/utils';

function App() {
  useEffect(() => {
    initializeStores();
  }, []);

  return (
    <SafeAreaProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { isAuthenticated, user, login, logout, isLoading, error } = useAuth();
  const { theme } = useSettings();
  const { toggleTheme } = useTheme();
  
  const colors = getThemeColors(theme);
  const isDarkMode = theme === 'dark' || (theme === 'system' && false);

  const handleLogin = async () => {
    try {
      await login('test@example.com', 'password123');
    } catch (err) {
      Alert.alert('Login Failed', error || 'Unknown error');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background}
      />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Zustand Store Demo
        </Text>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Authentication Status:
          </Text>
          <Text style={[styles.status, { color: isAuthenticated ? colors.success : colors.error }]}>
            {isAuthenticated ? 'Logged In' : 'Not Logged In'}
          </Text>
          
          {user && (
            <Text style={[styles.userInfo, { color: colors.textSecondary }]}>
              Welcome, {user.name}!
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Theme Settings:
          </Text>
          <Text style={[styles.themeInfo, { color: colors.textSecondary }]}>
            Current theme: {theme}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {!isAuthenticated ? (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Logging in...' : 'Login Demo'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.error }]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.secondary }]}
            onPress={toggleTheme}
          >
            <Text style={styles.buttonText}>Toggle Theme</Text>
          </TouchableOpacity>
        </View>

        {error && (
          <View style={[styles.errorContainer, { backgroundColor: colors.error + '20' }]}>
            <Text style={[styles.errorText, { color: colors.error }]}>
              Error: {error}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: '500',
  },
  userInfo: {
    fontSize: 14,
    marginTop: 4,
  },
  themeInfo: {
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default App;
