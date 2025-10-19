# TMDB Movie Database App

A React Native movie database application built with TypeScript, featuring movie browsing, search, and wishlist functionality using The Movie Database (TMDB) API.

## Features

### Home Screen
- ✅ Browse movies by category (Now Playing, Upcoming, Popular)
- ✅ Search movies by keyword
- ✅ Sort movies by alphabetical order, rating, or release date
- ✅ Category and sort preferences persist after app restart
- ✅ Navigate to movie details

### Details Screen
- ✅ View complete movie information:
  - Title, year, rating (PG-13, etc)
  - Poster and backdrop images
  - Release date, runtime, genres, status
  - Original language
  - Director and Writer credits
  - User score (rating)
  - Tagline and overview
- ✅ View cast members with photos and character names
- ✅ Add/remove movies from wishlist
- ✅ View recommended movies (horizontal scroll)

### Wishlist Screen
- ✅ View saved movies
- ✅ Filter by alphabetical order, rating, or release date
- ✅ Sort ascending or descending
- ✅ Remove movies from wishlist
- ✅ Wishlist persists after app restart
- ✅ Navigate to movie details

## Tech Stack

- **React Native 0.82.0** - Mobile framework
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Navigation** - Navigation (Stack + Bottom Tabs)
- **Axios** - HTTP client for API calls
- **MMKV** - Fast local storage for persistence
- **React Native Fast Image** - Optimized image loading
- **react-native-dotenv** - Environment variable management

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Dropdown.tsx          # Reusable dropdown selector
│   │   ├── LoadingSpinner.tsx    # Loading indicator
│   │   └── ErrorMessage.tsx      # Error display
│   └── movie/
│       └── MovieCard.tsx         # Movie list item card
├── config/
│   └── api.config.ts             # API configuration
├── navigation/
│   └── RootNavigator.tsx         # Navigation setup
├── screens/
│   ├── HomeScreen.tsx            # Main movie list screen
│   ├── DetailsScreen.tsx         # Movie details screen
│   └── WishlistScreen.tsx        # Saved movies screen
├── services/
│   └── tmdb.service.ts           # TMDB API service layer
├── stores/
│   └── movieStore.ts             # Zustand store for state
└── types/
    ├── env.d.ts                  # Environment types
    └── movie.types.ts            # Movie data types
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure TMDB API Key

The `.env` file already contains the API key, but if you need to update it:

1. Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup) and create an account
2. Verify your email
3. Go to Settings > API
4. Generate an API Read Access Token (v4 auth)
5. Update the `.env` file:

```env
TMDB_API_KEY=your_api_read_access_token_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**Important:** The `.env` file is already in `.gitignore` to prevent committing your API key.

### 3. Install iOS Dependencies (macOS only)

```bash
cd ios && pod install && cd ..
```

### 4. Run the App

**For iOS:**
```bash
npm run ios
# or
yarn ios
```

**For Android:**
```bash
npm run android
# or
yarn android
```

## API Endpoints Used

- `/movie/now_playing` - Get now playing movies
- `/movie/upcoming` - Get upcoming movies
- `/movie/popular` - Get popular movies
- `/search/movie` - Search movies by keyword
- `/movie/{id}` - Get movie details
- `/movie/{id}/credits` - Get movie cast and crew
- `/movie/{id}/release_dates` - Get movie rating (PG-13, etc)
- `/movie/{id}/recommendations` - Get recommended movies

## State Management

The app uses Zustand for state management with MMKV for persistence:

- **Movie List State** - Current displayed movies
- **Wishlist** - Saved movies (persisted)
- **Preferences** - Category and sort options (persisted)
- **Search Query** - Current search term

## Key Features Implementation

### Persistence
- Category preference saved to local storage
- Sort preference saved to local storage
- Wishlist saved to local storage
- All data persists across app restarts

### Error Handling
- Network error handling with retry functionality
- Empty state messages
- Image placeholder for missing posters
- Graceful fallbacks for missing data

### Performance
- Fast Image for optimized image loading
- MMKV for fast local storage
- Efficient list rendering with FlatList
- Optimized re-renders with Zustand

## Screenshots Reference

See the Figma design for UI/UX reference:
[Figma Design Link](https://www.figma.com/file/ZfiD9sNTA9IjlflyipIGmr/App-Developer-Test---UI-Design)

## Development Notes

### Assumptions Made

1. **User Authentication**: Mock user data used for wishlist screen (John Lee)
2. **Sorting**: Sort order toggle between ascending/descending on wishlist
3. **Rating**: Using US release dates for movie rating (PG-13, etc)
4. **Images**: Showing placeholder when poster/profile images are not available
5. **Recommendations**: Limited to 5 movies in the carousel
6. **Cast**: Showing top 10 cast members in carousel

### Optional Features Implemented

- ✅ Sort by dropdown on Home screen
- ✅ Bottom tab navigation
- ✅ Add to Watchlist functionality
- ✅ Recommended movies carousel
- ✅ TypeScript implementation

## Troubleshooting

### Metro Bundler Issues
```bash
# Clear Metro cache
npm start -- --reset-cache
```

### Build Issues
```bash
# Clean build folders
cd android && ./gradlew clean && cd ..
cd ios && xcodebuild clean && cd ..
```

### API Not Working
- Check your internet connection
- Verify TMDB API key is correct in `.env`
- Restart Metro bundler after changing `.env`

## License

This is a test project for demonstration purposes.