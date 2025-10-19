# Global State Management với Zustand

## 🎯 Overview

App đã được refactor để sử dụng **Global State Management** cho loading và error states thay vì local component state. Điều này mang lại nhiều lợi ích:

- ✅ **Centralized State** - Quản lý loading/error ở một chỗ
- ✅ **Reusability** - Có thể dùng chung cho nhiều components
- ✅ **Consistency** - Tránh duplicate logic
- ✅ **Better UX** - Có thể hiển thị global loading overlay nếu cần

## 📦 Store Structure

### Updated MovieStore

```typescript
// src/stores/movieStore.ts

interface MovieState {
  // ... existing states

  // Global Loading & Error States
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}
```

### State Properties

#### `isLoading: boolean`
- Tracks global loading state
- `true` khi đang fetch data từ API
- `false` khi hoàn thành hoặc có lỗi

#### `error: string | null`
- Stores error message
- `null` khi không có lỗi
- `string` chứa error message khi có lỗi

### Actions

#### `setIsLoading(loading: boolean)`
```typescript
// Set loading state
setIsLoading(true);  // Start loading
setIsLoading(false); // Stop loading
```

#### `setError(error: string | null)`
```typescript
// Set error message
setError('Failed to load movies');  // Set error
setError(null);                     // Clear error
```

#### `clearError()`
```typescript
// Helper function to clear error
clearError(); // Same as setError(null)
```

## 🔄 Usage Pattern

### Before (Local State)
```typescript
const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      // ... fetch logic
    } catch (err) {
      setError('Error message');
    } finally {
      setLoading(false);
    }
  };
};
```

### After (Global State)
```typescript
const HomeScreen = () => {
  const {
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError
  } = useMovieStore();

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      clearError();
      // ... fetch logic
    } catch (err) {
      setError('Error message');
    } finally {
      setIsLoading(false);
    }
  };
};
```

## 📱 Implementation Examples

### 1. HomeScreen với Global Loading/Error

```typescript
import { useMovieStore } from '../../stores/movieStore';

export const HomeScreen = () => {
  const {
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError,
  } = useMovieStore();

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      clearError();

      const response = await tmdbService.getMovies();
      setMovies(response.results);
    } catch (err) {
      setError('Failed to load movies');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner
  if (isLoading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  // Show error message
  if (error && movies.length === 0) {
    return <ErrorMessage message={error} onRetry={fetchMovies} />;
  }

  return (
    // ... render movies
  );
};
```

### 2. DetailsScreen có thể dùng chung

```typescript
export const DetailsScreen = () => {
  const { isLoading, setIsLoading, setError, clearError } = useMovieStore();

  const fetchDetails = async (movieId: number) => {
    try {
      setIsLoading(true);
      clearError();

      const details = await tmdbService.getMovieDetails(movieId);
      setMovieDetails(details);
    } catch (err) {
      setError('Failed to load movie details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ...
};
```

### 3. Multiple API Calls

```typescript
const fetchMultipleData = async () => {
  try {
    setIsLoading(true);
    clearError();

    // Fetch multiple endpoints
    const [movies, genres, popular] = await Promise.all([
      tmdbService.getNowPlaying(),
      tmdbService.getGenres(),
      tmdbService.getPopular(),
    ]);

    // Update all states
    setMovies(movies.results);
    setGenres(genres);
    setPopular(popular.results);

  } catch (err) {
    setError('Failed to load data');
  } finally {
    setIsLoading(false);
  }
};
```

## 🎨 Benefits

### 1. **Centralized State Management**
```typescript
// Tất cả components share cùng loading/error state
const { isLoading, error } = useMovieStore();

// Có thể tạo global loading overlay
{isLoading && <GlobalLoadingOverlay />}
```

### 2. **Cleaner Components**
```typescript
// Không cần useState cho loading/error
// Không cần local state management
// Code cleaner và dễ maintain hơn
```

### 3. **Consistent Error Handling**
```typescript
// Error handling logic ở một chỗ
// Có thể tạo global error handler
useEffect(() => {
  if (error) {
    // Show toast notification
    // Log to analytics
    // etc.
  }
}, [error]);
```

### 4. **Better Testing**
```typescript
// Dễ dàng mock store state
const mockStore = {
  isLoading: true,
  error: null,
  // ...
};

// Test loading state
// Test error state
```

## 🔧 Advanced Patterns

### 1. Loading States per Action

Nếu cần track loading cho từng action riêng biệt:

```typescript
interface MovieState {
  loadingStates: {
    fetchingMovies: boolean;
    fetchingDetails: boolean;
    searchingMovies: boolean;
  };

  setLoadingState: (key: keyof LoadingStates, value: boolean) => void;
}

// Usage
setLoadingState('fetchingMovies', true);
```

### 2. Error Types

Có thể expand error state để handle nhiều error types:

```typescript
interface ErrorState {
  type: 'network' | 'api' | 'validation' | null;
  message: string | null;
  code?: string;
}

interface MovieState {
  error: ErrorState;
  setError: (error: ErrorState) => void;
}

// Usage
setError({
  type: 'network',
  message: 'No internet connection',
  code: 'ERR_NETWORK'
});
```

### 3. Loading Queue

Track multiple concurrent requests:

```typescript
interface MovieState {
  loadingQueue: Set<string>;
  addLoading: (id: string) => void;
  removeLoading: (id: string) => void;
  isLoading: boolean; // computed: loadingQueue.size > 0
}

// Usage
addLoading('fetch-movies');
// ... fetch
removeLoading('fetch-movies');
```

## 📊 State Flow Diagram

```
User Action
    ↓
setIsLoading(true) + clearError()
    ↓
API Call
    ↓
Success                    Error
    ↓                         ↓
Update Data          setError(message)
    ↓                         ↓
setIsLoading(false)  setIsLoading(false)
    ↓                         ↓
Component Re-render  Show Error UI
```

## 🎯 Best Practices

### 1. Always Clear Error Before New Request
```typescript
// ✅ Good
setIsLoading(true);
clearError();
await fetchData();

// ❌ Bad - old error might show
setIsLoading(true);
await fetchData();
```

### 2. Always Set Loading to False in Finally
```typescript
// ✅ Good
try {
  setIsLoading(true);
  await fetchData();
} catch (err) {
  setError(err.message);
} finally {
  setIsLoading(false); // Always executed
}

// ❌ Bad - loading might stuck if error
try {
  setIsLoading(true);
  await fetchData();
  setIsLoading(false);
} catch (err) {
  setError(err.message);
}
```

### 3. Handle Empty Results
```typescript
// Show loading only when no data
if (isLoading && movies.length === 0) {
  return <LoadingSpinner />;
}

// Show error only when no data
if (error && movies.length === 0) {
  return <ErrorMessage message={error} />;
}
```

### 4. Provide Retry Functionality
```typescript
<ErrorMessage
  message={error}
  onRetry={() => fetchMovies()}
/>
```

## 🔄 Migration Checklist

Khi migrate từ local state sang global state:

- [ ] Remove local `useState` for loading
- [ ] Remove local `useState` for error
- [ ] Import loading/error from `useMovieStore`
- [ ] Replace `setLoading` with `setIsLoading`
- [ ] Replace `setError` with global `setError`
- [ ] Add `clearError()` before API calls
- [ ] Update conditional rendering to use global states
- [ ] Test loading states
- [ ] Test error states
- [ ] Test retry functionality

## 📝 Example: Complete Screen Implementation

```typescript
import React, { useEffect } from 'react';
import { useMovieStore } from '../../stores/movieStore';
import { tmdbService } from '../../services/tmdb.service';
import { LoadingSpinner, ErrorMessage } from '../../components/common';

export const HomeScreen = () => {
  const {
    movies,
    setMovies,
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError,
  } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      clearError();

      const response = await tmdbService.getNowPlaying();
      setMovies(response.results);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading && movies.length === 0) {
    return <LoadingSpinner message="Loading movies..." />;
  }

  // Error state
  if (error && movies.length === 0) {
    return <ErrorMessage message={error} onRetry={fetchMovies} />;
  }

  // Success state
  return (
    <View>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </View>
  );
};
```

## 🎉 Summary

### Key Improvements

1. **Centralized State**
   - Loading và error state trong Zustand store
   - Accessible từ bất kỳ component nào
   - Single source of truth

2. **Cleaner Code**
   - Không cần local useState
   - Consistent error handling
   - Reusable logic

3. **Better UX**
   - Consistent loading indicators
   - Unified error handling
   - Easy to add global features (overlay, toast, etc.)

4. **Scalability**
   - Dễ dàng thêm features mới
   - Có thể extend cho complex scenarios
   - Maintainable long-term

---

**Happy Coding!** 🚀✨