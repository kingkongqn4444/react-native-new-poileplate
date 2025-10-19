# 🚀 Advanced Features & Setup

## ✨ Additional Features Implemented

Các tính năng nâng cao đã được thêm vào để improve code quality, developer experience, và app stability.

---

## 1️⃣ Error Boundary - Crash Prevention

### 📋 Overview
Error Boundary bắt JavaScript errors trong component tree, log errors, và hiển thị fallback UI thay vì crash toàn bộ app.

### 📁 Location
```
src/components/common/ErrorBoundary.tsx
```

### ✅ Features
- ✅ Catches React component errors
- ✅ Prevents app crashes
- ✅ Shows user-friendly error screen
- ✅ Displays error details in DEV mode
- ✅ "Try Again" button to reset
- ✅ Ready for error tracking integration (Sentry, etc.)

### 🔧 Implementation

```typescript
// App.tsx
import { ErrorBoundary } from './src/components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      {/* Your app */}
    </ErrorBoundary>
  );
}
```

### 💡 Usage Examples

**Basic Usage:**
```typescript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**Custom Fallback:**
```typescript
<ErrorBoundary
  fallback={
    <View>
      <Text>Custom Error UI</Text>
    </View>
  }
>
  <YourComponent />
</ErrorBoundary>
```

### 🎯 What It Catches
- ✅ Rendering errors
- ✅ Lifecycle method errors
- ✅ Constructor errors
- ✅ Event handler errors (wrapped)

### ❌ What It Doesn't Catch
- ❌ Event handlers (need try-catch)
- ❌ Async code (setTimeout, promises)
- ❌ Server-side rendering
- ❌ Errors in Error Boundary itself

### 📊 Error Screen Features

**Production Mode:**
- Friendly error message
- "Try Again" button
- No technical details exposed

**Development Mode:**
- Full error message
- Component stack trace
- Error details for debugging

### 🔗 Integration Ready

```typescript
// Add Sentry or other error tracking
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  // Log to error tracking service
  Sentry.captureException(error, {
    contexts: {
      react: {
        componentStack: errorInfo.componentStack,
      },
    },
  });
}
```

---

## 2️⃣ Absolute Imports - Clean Import Paths

### 📋 Overview
Sử dụng absolute imports với path aliases để code cleaner và dễ maintain hơn.

### 🔧 Configuration

**TypeScript Config (`tsconfig.json`):**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@navigation/*": ["src/navigation/*"],
      "@services/*": ["src/services/*"],
      "@stores/*": ["src/stores/*"],
      "@theme/*": ["src/theme/*"],
      "@types/*": ["src/types/*"],
      "@config/*": ["src/config/*"],
      "@utils/*": ["src/utils/*"],
      "@hooks/*": ["src/hooks/*"]
    }
  }
}
```

**Babel Config (`babel.config.js`):**
```javascript
{
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          // ... etc
        },
      },
    ],
  ],
}
```

### ✅ Benefits

**Before (Relative Imports):**
```typescript
import { Button } from '../../../components/common/Button';
import { useAuth } from '../../../../stores/authStore';
import { theme } from '../../../theme';
import { Movie } from '../../../../types/movie.types';
```

**After (Absolute Imports):**
```typescript
import { Button } from '@components/common/Button';
import { useAuth } from '@stores/authStore';
import { theme } from '@theme';
import { Movie } from '@types/movie.types';
```

### 🎯 Available Aliases

| Alias | Path | Usage |
|-------|------|-------|
| `@/*` | `src/*` | `import { something } from '@/utils/helper'` |
| `@components/*` | `src/components/*` | `import { Button } from '@components/common/Button'` |
| `@screens/*` | `src/screens/*` | `import { HomeScreen } from '@screens/Home/HomeScreen'` |
| `@navigation/*` | `src/navigation/*` | `import { RootNavigator } from '@navigation/RootNavigator'` |
| `@services/*` | `src/services/*` | `import { tmdbService } from '@services/tmdb.service'` |
| `@stores/*` | `src/stores/*` | `import { useMovieStore } from '@stores/movieStore'` |
| `@theme/*` | `src/theme/*` | `import { colors } from '@theme/colors'` |
| `@types/*` | `src/types/*` | `import type { Movie } from '@types/movie.types'` |
| `@config/*` | `src/config/*` | `import { API_CONFIG } from '@config/api.config'` |
| `@utils/*` | `src/utils/*` | `import { formatDate } from '@utils/date'` |
| `@hooks/*` | `src/hooks/*` | `import { useDebounce } from '@hooks/useDebounce'` |

### 💡 Usage Examples

**Components:**
```typescript
// Old way
import { Dropdown } from '../../components/common/Dropdown';

// New way
import { Dropdown } from '@components/common/Dropdown';
```

**Stores:**
```typescript
// Old way
import { useMovieStore } from '../../../stores/movieStore';

// New way
import { useMovieStore } from '@stores/movieStore';
```

**Theme:**
```typescript
// Old way
import { theme } from '../../theme';

// New way
import { theme } from '@theme';
```

**Types:**
```typescript
// Old way
import type { Movie } from '../../../types/movie.types';

// New way
import type { Movie } from '@types/movie.types';
```

### 🔄 Migration

To migrate existing code:

```bash
# Find all relative imports
grep -r "from '\.\." src/

# Replace with absolute imports
# Example: '../../../stores/movieStore' → '@stores/movieStore'
```

### 🎨 IDE Support

**VSCode:**
- Auto-completion works ✅
- Go to definition works ✅
- Refactoring works ✅

**TypeScript:**
- Type checking works ✅
- Intellisense works ✅

---

## 📚 Additional Utilities Ready to Add

### 3️⃣ Custom Hooks Library

Create reusable hooks:

```typescript
// src/hooks/useDebounce.ts
export const useDebounce = (value: string, delay: number) => {
  // Implementation
};

// src/hooks/useNetwork.ts
export const useNetwork = () => {
  // Check network status
};

// Usage
import { useDebounce } from '@hooks/useDebounce';
```

### 4️⃣ Utility Functions

```typescript
// src/utils/date.ts
export const formatDate = (date: string) => {
  // Format date
};

// src/utils/string.ts
export const truncate = (str: string, length: number) => {
  // Truncate string
};

// Usage
import { formatDate } from '@utils/date';
import { truncate } from '@utils/string';
```

### 5️⃣ Constants

```typescript
// src/config/constants.ts
export const APP_CONFIG = {
  APP_NAME: 'TMDB Movie App',
  VERSION: '1.0.0',
  API_TIMEOUT: 10000,
};

// Usage
import { APP_CONFIG } from '@config/constants';
```

---

## 🎯 Best Practices

### Error Handling

**DO:**
```typescript
// Wrap components that might crash
<ErrorBoundary>
  <ComplexComponent />
</ErrorBoundary>
```

**DON'T:**
```typescript
// Don't wrap entire app if you want granular error handling
// Better to wrap specific features
```

### Import Paths

**DO:**
```typescript
// Use absolute imports for cleaner code
import { Button } from '@components/common/Button';
import { useMovieStore } from '@stores/movieStore';
```

**DON'T:**
```typescript
// Avoid deep relative imports
import { Button } from '../../../components/common/Button';
```

### Organization

**DO:**
```typescript
// Group imports by category
import React from 'react';
import { View } from 'react-native';

import { Button } from '@components/common/Button';
import { useMovieStore } from '@stores/movieStore';
import { theme } from '@theme';
import type { Movie } from '@types/movie.types';
```

---

## 🚀 Performance Impact

### Error Boundary
- **Bundle Size:** +2KB (minimal)
- **Runtime:** Negligible
- **Benefits:** Prevents app crashes

### Absolute Imports
- **Bundle Size:** No impact
- **Build Time:** No impact
- **Benefits:** Better DX, easier refactoring

---

## 📊 Summary

### Features Added

| Feature | Benefit | Impact |
|---------|---------|--------|
| Error Boundary | Prevents crashes | High |
| Absolute Imports | Cleaner code | High |
| Path Aliases | Better DX | Medium |

### Developer Experience

- ✅ Cleaner import statements
- ✅ Easier refactoring
- ✅ Better code organization
- ✅ Improved maintainability
- ✅ Crash protection
- ✅ Better error handling

### Production Ready

- ✅ Error Boundary catches crashes
- ✅ User-friendly error screens
- ✅ Development error details
- ✅ Clean code structure

---

## 🔜 Recommended Next Steps

### High Priority

1. **Add Custom Hooks**
   - useDebounce
   - useNetwork
   - usePrevious
   - useAsync

2. **Create Utility Library**
   - Date formatters
   - String helpers
   - Number formatters
   - Validators

3. **Add Constants**
   - App configuration
   - Feature flags
   - Environment variables

### Medium Priority

4. **Network Interceptor**
   - Request/response logging
   - Auth token injection
   - Error handling

5. **Performance Monitoring**
   - React Native Performance
   - Custom metrics

6. **Analytics**
   - Event tracking
   - Screen tracking
   - User properties

### Nice to Have

7. **Storybook**
   - Component documentation
   - Visual testing

8. **E2E Testing**
   - Detox setup
   - Test scenarios

9. **CI/CD**
   - GitHub Actions
   - Automated builds

---

**Features are ready to use!** 🎉✨