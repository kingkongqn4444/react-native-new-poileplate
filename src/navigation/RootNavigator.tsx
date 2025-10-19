/**
 * Root Navigator
 * Main navigation configuration with bottom tabs
 */

import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { WishlistScreen } from '../screens/WishlistScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack Navigator
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Movie Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

// Wishlist Stack Navigator
const WishlistStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WishlistMain"
        component={WishlistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Movie Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

// Bottom Tab Navigator
export const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistStack}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="⭐" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Simple Tab Icon Component
const TabIcon: React.FC<{ icon: string; color: string }> = ({
  icon,
  color,
}) => {
  return <Text style={{ fontSize: 24, color }}>{icon}</Text>;
};