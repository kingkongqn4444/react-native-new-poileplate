/**
 * React Native Movie App with TMDB API
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FlashMessage from 'react-native-flash-message';
import BootSplash from 'react-native-bootsplash';
import { theme } from './src/theme';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useMovieStore } from './src/stores/movieStore';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  const { initialize } = useMovieStore();

  useEffect(() => {
    const init = async () => {
      // Initialize movie store from local storage
      initialize();
      // Hide splash screen after initialization
      await BootSplash.hide({ fade: true });
    };

    init();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" backgroundColor="#fff" />
              <RootNavigator />
              <FlashMessage position="top" />
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
