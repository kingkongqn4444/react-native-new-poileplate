# Zustand Store Integration

This project demonstrates a complete Zustand store integration for React Native with the following features:

## 🏗️ Store Architecture

### Stores
- **AuthStore**: Handles authentication state, login, logout, token management
- **UserStore**: Manages user profile data and updates
- **SettingsStore**: App settings, theme, notifications, privacy preferences

### Features
- ✅ Persistent storage with AsyncStorage
- ✅ TypeScript support
- ✅ Custom hooks for easy usage
- ✅ Error handling
- ✅ Loading states
- ✅ Theme management
- ✅ Form validation utilities

## 📁 Project Structure

```
src/
├── stores/
│   ├── authStore.ts          # Authentication store
│   ├── userStore.ts          # User profile store
│   ├── settingsStore.ts      # App settings store
│   ├── StoreProvider.tsx     # Store provider component
│   └── index.ts              # Store exports
├── hooks/
│   └── index.ts              # Custom hooks
├── types/
│   └── index.ts              # TypeScript types
├── utils/
│   └── index.ts              # Utility functions
├── screens/
│   ├── LoginScreen.tsx       # Login example
│   ├── ProfileScreen.tsx     # Profile management
│   ├── SettingsScreen.tsx    # Settings management
│   └── index.ts              # Screen exports
└── components/               # Reusable components
```

## 🚀 Usage Examples

### Basic Store Usage

```typescript
import { useAuth, useSettings } from './src/hooks';

function MyComponent() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const { theme, toggleTheme } = useSettings();
  
  return (
    <View>
      {isAuthenticated ? (
        <Text>Welcome, {user?.name}!</Text>
      ) : (
        <Button onPress={() => login('email', 'password')} title="Login" />
      )}
    </View>
  );
}
```

### Authentication

```typescript
// Login
const { login, isLoading, error } = useLogin();
await login('user@example.com', 'password123');

// Logout
const { logout } = useLogout();
logout();

// Check auth status
const { isAuthenticated, user } = useAuth();
```

### User Management

```typescript
// Update user profile
const { user, updateProfile } = useUserProfile();
await updateProfile({ name: 'New Name', phone: '+1234567890' });
```

### Settings Management

```typescript
// Theme management
const { theme, setTheme, toggleTheme } = useTheme();
setTheme('dark'); // 'light' | 'dark' | 'system'

// Notifications
const { notifications, toggleNotification } = useNotifications();
toggleNotification('push');
```

## 🔧 Configuration

### Store Persistence

Stores are automatically persisted using AsyncStorage:

```typescript
// Auth store persists: isAuthenticated, user, token, refreshToken
// User store persists: user
// Settings store persists: all settings
```

### API Integration

Replace the mock API calls in stores with your actual API endpoints:

```typescript
// In authStore.ts
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```

## 🎨 Theme System

The app includes a complete theme system:

```typescript
const colors = getThemeColors(theme);
// Returns: primary, secondary, background, surface, text, etc.
```

## 📱 Example Screens

- **LoginScreen**: Complete login form with validation
- **ProfileScreen**: User profile management with edit functionality
- **SettingsScreen**: App settings with theme and notification toggles

## 🔒 Security Features

- Token-based authentication
- Automatic token refresh
- Secure storage with AsyncStorage
- Input validation
- Error handling

## 🧪 Testing

The stores are designed to be easily testable:

```typescript
// Test store actions
const store = useAuthStore.getState();
await store.login('test@example.com', 'password');
expect(store.isAuthenticated).toBe(true);
```

## 📦 Dependencies

- `zustand`: State management
- `@react-native-async-storage/async-storage`: Persistent storage
- `react-native-safe-area-context`: Safe area handling

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install zustand @react-native-async-storage/async-storage
```

2. Import and use stores:
```typescript
import { useAuthStore, useSettingsStore } from './src/stores';
```

3. Wrap your app with StoreProvider:
```typescript
import { StoreProvider } from './src/stores/StoreProvider';

function App() {
  return (
    <StoreProvider>
      {/* Your app content */}
    </StoreProvider>
  );
}
```

## 🔄 State Updates

All state updates are handled through Zustand actions:

```typescript
// Direct store access
const { login } = useAuthStore();

// Through custom hooks (recommended)
const { login } = useAuth();
```

This architecture provides a scalable, maintainable, and type-safe state management solution for React Native applications.
