/**
 * Home Screen
 * Main screen showing movies by category with search functionality
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMovieStore, sortMovies } from '../stores/movieStore';
import { tmdbService } from '../services/tmdb.service';
import { Dropdown } from '../components/common/Dropdown';
import { MovieCard } from '../components/movie/MovieCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import type { Movie, MovieCategory, SortOption } from '../types/movie.types';

const CATEGORY_OPTIONS = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Popular', value: 'popular' },
];

const SORT_OPTIONS = [
  { label: 'By alphabetical order', value: 'alphabetical' },
  { label: 'By rating', value: 'rating' },
  { label: 'By release date', value: 'release_date' },
];

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const {
    movies,
    setMovies,
    preferences,
    setCategory,
    setSortBy,
    searchQuery,
    setSearchQuery,
  } = useMovieStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Fetch movies on mount and when category changes
  useEffect(() => {
    fetchMovies();
  }, [preferences.category]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (searchQuery) {
        response = await tmdbService.searchMovies(searchQuery);
      } else {
        response = await tmdbService.getMoviesByCategory(preferences.category);
      }

      setMovies(response.results);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchQuery(localSearchQuery);
    fetchMovies();
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value as MovieCategory);
    setSearchQuery('');
    setLocalSearchQuery('');
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('Details', { movieId: movie.id });
  };

  // Sort movies based on preferences
  const sortedMovies = sortMovies(
    movies,
    preferences.sortBy,
    preferences.sortOrder
  );

  if (loading && movies.length === 0) {
    return <LoadingSpinner message="Loading movies..." />;
  }

  if (error && movies.length === 0) {
    return <ErrorMessage message={error} onRetry={fetchMovies} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>TMDB</Text>
          <Text style={styles.logoSubtitle}>MOVIE APP</Text>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <Dropdown
          label="Category"
          options={CATEGORY_OPTIONS}
          selectedValue={preferences.category}
          onValueChange={handleCategoryChange}
        />

        <Dropdown
          label="Sort by"
          options={SORT_OPTIONS}
          selectedValue={preferences.sortBy}
          onValueChange={handleSortChange}
        />

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            value={localSearchQuery}
            onChangeText={setLocalSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {sortedMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery
              ? 'No movies found for your search'
              : 'No movies available'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 16,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoSubtitle: {
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});