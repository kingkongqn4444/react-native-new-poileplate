# React Query & Error Handling Documentation

## 🎯 Overview

This application uses **TanStack Query (React Query) v5** for efficient data fetching, caching, and state management, combined with a **global error notification system** using Zustand and FlashMessage.

## 📦 Packages Used

- `@tanstack/react-query` - Data fetching and caching
- `react-native-flash-message` - Toast notifications
- `zustand` - Global notification state management

---

## 🔔 Global Error Notification System

### Notification Store

Location: [src/stores/notificationStore.ts](src/stores/notificationStore.ts)

The notification store provides a centralized way to show error messages, success messages, warnings, and info alerts anywhere in the app.

### Usage

```typescript
import { useNotificationStore } from '@/stores/notificationStore';

function MyComponent() {
  const { showError, showSuccess, showWarning, showInfo, handleApiError } = useNotificationStore();

  // Show simple error
  const handleError = () => {
    showError('Something went wrong', 'Please try again later');
  };

  // Show success message
  const handleSuccess = () => {
    showSuccess('Movie added to wishlist!');
  };

  // Show warning
  const handleWarning = () => {
    showWarning('Limited results', 'Only showing first 100 movies');
  };

  // Show info
  const handleInfo = () => {
    showInfo('Tip', 'Swipe down to refresh the list');
  };

  // Handle API errors (auto-parse status codes)
  const callApi = async () => {
    try {
      await someApiCall();
    } catch (error) {
      handleApiError(error); // Automatically shows appropriate error message
    }
  };
}
```

### Available Methods

#### `showError(message, description?)`
Shows a red error notification
```typescript
showError('Failed to load data', 'Please check your connection');
```

#### `showSuccess(message, description?)`
Shows a green success notification
```typescript
showSuccess('Saved successfully!');
```

#### `showWarning(message, description?)`
Shows a yellow warning notification
```typescript
showWarning('Session expiring soon', 'Please save your work');
```

#### `showInfo(message, description?)`
Shows a blue info notification
```typescript
showInfo('New feature available', 'Check out our new dark mode!');
```

#### `handleApiError(error, customMessage?)`
Automatically handles API errors with appropriate messages based on HTTP status codes:
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **429**: Too Many Requests (Rate limit)
- **500/502/503**: Server Error
- **Network Error**: Connection issues

```typescript
try {
  const data = await fetchMovies();
} catch (error) {
  handleApiError(error, 'Failed to fetch movies');
}
```

---

## ⚡ React Query Setup

### Query Client Configuration

Location: [App.tsx:20-34](App.tsx#L20-L34)

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed requests 2 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (cache time)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

**Configuration Explained:**
- **retry: 2** - Automatically retry failed requests twice before giving up
- **retryDelay** - Exponential backoff (1s, 2s, 4s...)
- **staleTime: 5 min** - Data considered fresh for 5 minutes
- **gcTime: 10 min** - Unused data removed from cache after 10 minutes
- **refetchOnWindowFocus: false** - Don't refetch when app regains focus
- **refetchOnReconnect: true** - Refetch when internet reconnects

---

## 🎣 React Query Hooks

Location: [src/hooks/useMovies.ts](src/hooks/useMovies.ts)

### Query Keys

Query keys are used for caching and invalidation:

```typescript
movieKeys.list('now_playing')        // ['movies', 'list', 'now_playing']
movieKeys.detail(123)                 // ['movies', 'detail', 123]
movieKeys.credits(123)                // ['movies', 'credits', 123]
movieKeys.recommendations(123)        // ['movies', 'recommendations', 123]
movieKeys.searchQuery('avengers', 1)  // ['movies', 'search', 'avengers', 1]
```

### Available Hooks

#### 1. `useMovies(category, options?)`

Fetch movies by category (single page)

```typescript
import { useMovies } from '@/hooks/useMovies';

function MovieList() {
  const { data, isLoading, error, refetch } = useMovies('now_playing');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage onRetry={refetch} />;

  return <MovieGrid movies={data.results} />;
}
```

#### 2. `useInfiniteMovies(category)` ⭐

Fetch movies with infinite scroll pagination

```typescript
import { useInfiniteMovies, flattenInfiniteQueryData } from '@/hooks/useMovies';

function MovieListWithLoadMore() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteMovies('popular');

  const movies = flattenInfiniteQueryData(data);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={movies}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
}
```

#### 3. `useSearchMovies(query, enabled?)`

Search movies with infinite scroll

```typescript
import { useSearchMovies, flattenInfiniteQueryData } from '@/hooks/useMovies';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useSearchMovies(searchQuery);

  const movies = flattenInfiniteQueryData(data);

  return (
    <View>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <MovieList movies={movies} onLoadMore={fetchNextPage} />
    </View>
  );
}
```

#### 4. `useMovieDetails(movieId)`

Fetch detailed information about a movie

```typescript
import { useMovieDetails } from '@/hooks/useMovies';

function MovieDetailsScreen({ movieId }) {
  const { data: movie, isLoading } = useMovieDetails(movieId);

  if (isLoading) return <Skeleton />;

  return (
    <View>
      <Title>{movie.title}</Title>
      <Overview>{movie.overview}</Overview>
      <Rating>{movie.vote_average}</Rating>
    </View>
  );
}
```

#### 5. `useMovieCredits(movieId)`

Fetch cast and crew information

```typescript
import { useMovieCredits } from '@/hooks/useMovies';

function CastList({ movieId }) {
  const { data: credits } = useMovieCredits(movieId);

  return (
    <FlatList
      data={credits?.cast || []}
      renderItem={({ item }) => <CastCard member={item} />}
    />
  );
}
```

#### 6. `useMovieRecommendations(movieId)`

Fetch recommended movies (errors are silently logged, not shown to user)

```typescript
import { useMovieRecommendations } from '@/hooks/useMovies';

function RecommendedMovies({ movieId }) {
  const { data: recommendations } = useMovieRecommendations(movieId);

  if (!recommendations?.results?.length) return null;

  return <MovieCarousel movies={recommendations.results} />;
}
```

---

## 🔄 Infinite Scroll Implementation

### HomeScreen Example

Location: [src/screens/Home/HomeScreen.tsx](src/screens/Home/HomeScreen.tsx)

The HomeScreen demonstrates a complete infinite scroll implementation with:
- ✅ Automatic pagination
- ✅ Load more on scroll
- ✅ Pull to refresh
- ✅ Loading indicators
- ✅ Error handling
- ✅ Search with infinite scroll

```typescript
export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { preferences } = useMovieStore();

  // Use different queries based on search state
  const moviesQuery = useInfiniteMovies(preferences.category);
  const searchQuery = useSearchMovies(searchQuery, searchQuery.length > 0);

  const activeQuery = searchQuery ? searchMoviesQuery : moviesQuery;
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = activeQuery;

  // Flatten pages into single array
  const movies = flattenInfiniteQueryData(data);

  return (
    <FlatList
      data={movies}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      ListFooterComponent={
        isFetchingNextPage ? <LoadMoreIndicator /> : null
      }
    />
  );
};
```

### Key Features:

**1. Automatic Load More**
```typescript
onEndReached={() => hasNextPage && fetchNextPage()}
onEndReachedThreshold={0.5} // Trigger when 50% from bottom
```

**2. Pull to Refresh**
```typescript
refreshControl={
  <RefreshControl
    refreshing={isFetching && !isFetchingNextPage}
    onRefresh={refetch}
  />
}
```

**3. Loading States**
```typescript
if (isLoading) return <LoadingSpinner />;
if (isFetchingNextPage) return <FooterLoadingIndicator />;
```

**4. Pagination Info**
```typescript
hasNextPage     // true if more pages available
isFetchingNextPage  // true when loading next page
fetchNextPage() // Function to load next page
```

---

## 🎨 Helper Functions

### `flattenInfiniteQueryData<T>(data)`

Converts paginated data structure into a flat array:

```typescript
// Input (React Query infinite data)
{
  pages: [
    { results: [movie1, movie2] },
    { results: [movie3, movie4] },
  ]
}

// Output (flat array)
[movie1, movie2, movie3, movie4]

// Usage
const movies = flattenInfiniteQueryData<Movie>(data);
```

### `getInfiniteQueryTotal(data)`

Gets total number of results from infinite query:

```typescript
const totalResults = getInfiniteQueryTotal(data); // e.g., 10000
```

---

## 🐛 Error Handling Patterns

### Pattern 1: Automatic Error Notifications

React Query hooks automatically show error notifications via `useEffect`:

```typescript
export const useMovies = (category) => {
  const { handleApiError } = useNotificationStore();

  const query = useQuery({
    queryKey: ['movies', category],
    queryFn: () => fetchMovies(category),
  });

  useEffect(() => {
    if (query.error) {
      handleApiError(query.error, 'Failed to fetch movies');
    }
  }, [query.error, handleApiError]);

  return query;
};
```

### Pattern 2: Custom Error Handling

Override automatic error handling when needed:

```typescript
const { data, error } = useMovieRecommendations(movieId);

// Custom handling
useEffect(() => {
  if (error) {
    console.error('Recommendations failed:', error);
    // Don't show notification for non-critical errors
  }
}, [error]);
```

### Pattern 3: Manual Error Handling

Call notification store directly:

```typescript
const { showError } = useNotificationStore();

const handleAddToWishlist = async () => {
  try {
    await addToWishlist(movie);
    showSuccess('Added to wishlist!');
  } catch (error) {
    showError('Failed to add to wishlist');
  }
};
```

---

## 🔧 Advanced Usage

### Invalidate Queries

Refresh data after mutations:

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { movieKeys } from '@/hooks/useMovies';

function AddMovieButton() {
  const queryClient = useQueryClient();

  const handleAdd = async () => {
    await addMovie(newMovie);

    // Invalidate and refetch
    queryClient.invalidateQueries({
      queryKey: movieKeys.lists()
    });
  };
}
```

### Optimistic Updates

Update UI before server response:

```typescript
const addToWishlistMutation = useMutation({
  mutationFn: addToWishlist,
  onMutate: async (newMovie) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries({ queryKey: ['wishlist'] });

    // Snapshot previous value
    const previous = queryClient.getQueryData(['wishlist']);

    // Optimistically update
    queryClient.setQueryData(['wishlist'], (old) => [...old, newMovie]);

    return { previous };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(['wishlist'], context.previous);
    showError('Failed to add to wishlist');
  },
});
```

### Prefetch Data

Improve perceived performance:

```typescript
const queryClient = useQueryClient();

const handleHoverMovie = (movieId: number) => {
  queryClient.prefetchQuery({
    queryKey: movieKeys.detail(movieId),
    queryFn: () => tmdbService.getMovieDetails(movieId),
  });
};
```

---

## 📱 FlashMessage Component

Location: [App.tsx:58](App.tsx#L58)

The FlashMessage component is rendered at the root level to show notifications:

```typescript
<FlashMessage position="top" />
```

This allows notifications to appear from anywhere in the app without prop drilling.

---

## ✅ Best Practices

### 1. Always Use Query Keys Consistently
```typescript
// ✅ Good - Use centralized keys
queryKey: movieKeys.detail(movieId)

// ❌ Bad - Hardcoded keys
queryKey: ['movie', movieId]
```

### 2. Handle Loading States Gracefully
```typescript
// ✅ Good
if (isLoading) return <Skeleton />;
if (error) return <ErrorMessage onRetry={refetch} />;
return <Content data={data} />;

// ❌ Bad - No loading state
return <Content data={data} />; // data might be undefined
```

### 3. Use Infinite Queries for Lists
```typescript
// ✅ Good - Infinite scroll
const { data } = useInfiniteMovies('popular');

// ❌ Bad - Manual pagination
const [page, setPage] = useState(1);
const { data } = useMovies('popular', page);
```

### 4. Show User-Friendly Error Messages
```typescript
// ✅ Good
handleApiError(error, 'Failed to load movies');

// ❌ Bad
showError(error.message); // Technical jargon
```

### 5. Don't Show Errors for Non-Critical Features
```typescript
// ✅ Good - Silent error for recommendations
useMovieRecommendations(movieId); // Logs error, doesn't notify user

// ❌ Bad - Annoying notifications for optional features
if (recommendationsError) {
  showError('Failed to load recommendations'); // User doesn't care
}
```

---

## 🚀 Performance Tips

1. **Use `staleTime`** to reduce unnecessary refetches
2. **Use `gcTime`** to control cache duration
3. **Prefetch** data for better UX
4. **Paginate** large lists with infinite queries
5. **Debounce** search inputs before querying

---

## 🐞 Debugging

### React Query Devtools (Development Only)

Add to your App.tsx for debugging:

```typescript
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      {__DEV__ && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
```

### Check Cache State

```typescript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();
console.log(queryClient.getQueryData(movieKeys.detail(123)));
```

---

## 📚 Additional Resources

- [TanStack Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
- [Flash Message Docs](https://github.com/lucasferreira/react-native-flash-message)

---

## 🎯 Summary

This app now has:
- ✅ **Global error notifications** accessible from anywhere
- ✅ **Automatic error handling** with appropriate messages
- ✅ **Infinite scroll** with optimized pagination
- ✅ **Smart caching** to reduce API calls
- ✅ **Automatic retries** with exponential backoff
- ✅ **Pull to refresh** functionality
- ✅ **Loading states** for better UX
- ✅ **Type-safe** React Query hooks

All API calls now automatically handle errors, cache responses, and provide seamless infinite scrolling! 🚀