/**
 * Movie Store - Zustand
 * Manages movie state, wishlist, and user preferences
 */

import { create } from 'zustand';
import { MMKV } from 'react-native-mmkv';
import type {
  Movie,
  MovieCategory,
  SortOption,
  SortOrder,
  WishlistMovie,
  MoviePreferences,
} from '../types/movie.types';

const storage = new MMKV({
  id: 'movie-storage',
});

// Storage keys
const KEYS = {
  WISHLIST: 'wishlist',
  PREFERENCES: 'preferences',
};

// Helper functions for MMKV storage
const loadWishlist = (): WishlistMovie[] => {
  try {
    const data = storage.getString(KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading wishlist:', error);
    return [];
  }
};

const saveWishlist = (wishlist: WishlistMovie[]) => {
  try {
    storage.set(KEYS.WISHLIST, JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
};

const loadPreferences = (): MoviePreferences => {
  try {
    const data = storage.getString(KEYS.PREFERENCES);
    return data
      ? JSON.parse(data)
      : {
          category: 'now_playing' as MovieCategory,
          sortBy: 'alphabetical' as SortOption,
          sortOrder: 'asc' as SortOrder,
        };
  } catch (error) {
    console.error('Error loading preferences:', error);
    return {
      category: 'now_playing' as MovieCategory,
      sortBy: 'alphabetical' as SortOption,
      sortOrder: 'asc' as SortOrder,
    };
  }
};

const savePreferences = (preferences: MoviePreferences) => {
  try {
    storage.set(KEYS.PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
};

interface MovieState {
  // Current movies list
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;

  // Wishlist
  wishlist: WishlistMovie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (movieId: number) => void;
  isInWishlist: (movieId: number) => boolean;

  // User preferences
  preferences: MoviePreferences;
  setCategory: (category: MovieCategory) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSortOrder: (sortOrder: SortOrder) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Global Loading & Error States
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Initialize store from storage
  initialize: () => void;
}

export const useMovieStore = create<MovieState>((set, get) => ({
  // Initial state
  movies: [],
  wishlist: [],
  preferences: {
    category: 'now_playing',
    sortBy: 'alphabetical',
    sortOrder: 'asc',
  },
  searchQuery: '',
  isLoading: false,
  error: null,

  // Actions
  setMovies: (movies) => set({ movies }),

  // Wishlist actions
  addToWishlist: (movie) => {
    const { wishlist } = get();
    const wishlistMovie: WishlistMovie = {
      ...movie,
      addedAt: Date.now(),
    };
    const newWishlist = [...wishlist, wishlistMovie];
    saveWishlist(newWishlist);
    set({ wishlist: newWishlist });
  },

  removeFromWishlist: (movieId) => {
    const { wishlist } = get();
    const newWishlist = wishlist.filter((movie) => movie.id !== movieId);
    saveWishlist(newWishlist);
    set({ wishlist: newWishlist });
  },

  isInWishlist: (movieId) => {
    const { wishlist } = get();
    return wishlist.some((movie) => movie.id === movieId);
  },

  // Preferences actions
  setCategory: (category) => {
    const { preferences } = get();
    const newPreferences = { ...preferences, category };
    savePreferences(newPreferences);
    set({ preferences: newPreferences });
  },

  setSortBy: (sortBy) => {
    const { preferences } = get();
    const newPreferences = { ...preferences, sortBy };
    savePreferences(newPreferences);
    set({ preferences: newPreferences });
  },

  setSortOrder: (sortOrder) => {
    const { preferences } = get();
    const newPreferences = { ...preferences, sortOrder };
    savePreferences(newPreferences);
    set({ preferences: newPreferences });
  },

  // Search action
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Loading & Error actions
  setIsLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  // Initialize from storage
  initialize: () => {
    const wishlist = loadWishlist();
    const preferences = loadPreferences();
    set({ wishlist, preferences });
  },
}));

/**
 * Helper function to sort movies
 */
export const sortMovies = (
  movies: Movie[] | WishlistMovie[],
  sortBy: SortOption,
  sortOrder: SortOrder
): Movie[] | WishlistMovie[] => {
  const sorted = [...movies].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'alphabetical':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'rating':
        comparison = b.vote_average - a.vote_average;
        break;
      case 'release_date':
        comparison =
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime();
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
};