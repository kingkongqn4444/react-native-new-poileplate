import React from 'react';
import { View } from 'react-native';
import type { Preview } from '@storybook/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../src/theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1, padding: 16, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    </ThemeProvider>
  ),
];

export const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};