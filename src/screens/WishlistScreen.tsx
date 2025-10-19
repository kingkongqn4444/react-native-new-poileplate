/**
 * Wishlist Screen
 * Shows user's saved movies with filter/sort functionality
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMovieStore, sortMovies } from '../stores/movieStore';
import { MovieCard } from '../components/movie/MovieCard';
import type { Movie, SortOption, SortOrder } from '../types/movie.types';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Alphabetical order', value: 'alphabetical' },
  { label: 'Rating', value: 'rating' },
  { label: 'Release date', value: 'release_date' },
];

export const WishlistScreen = () => {
  const navigation = useNavigation<any>();

  const { wishlist, removeFromWishlist } = useMovieStore();

  const [sortBy, setSortBy] = useState<SortOption>('alphabetical');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('Details', { movieId: movie.id });
  };

  const handleRemove = (movieId: number) => {
    removeFromWishlist(movieId);
  };

  const handleSortSelect = (value: SortOption) => {
    setSortBy(value);
    setShowSortMenu(false);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  // Sort wishlist
  const sortedWishlist = sortMovies(wishlist, sortBy, sortOrder) as Movie[];

  const selectedSort = SORT_OPTIONS.find((opt) => opt.value === sortBy);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JL</Text>
          </View>
          <View>
            <Text style={styles.username}>John Lee</Text>
            <Text style={styles.joinedDate}>Joined Jan 15, 2023</Text>
          </View>
        </View>
      </View>

      {/* My Wishlist Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>My Wishlist</Text>

        {/* Filter/Sort Controls */}
        <View style={styles.filterControls}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowSortMenu(!showSortMenu)}
          >
            <Text style={styles.filterButtonText}>Filter by:</Text>
            <Text style={styles.filterValue}>{selectedSort?.label}</Text>
            <Text style={styles.filterIcon}>▼</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortOrderButton}
            onPress={toggleSortOrder}
          >
            <Text style={styles.sortOrderIcon}>
              {sortOrder === 'asc' ? '↓' : '↑'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sort Options Dropdown */}
        {showSortMenu && (
          <View style={styles.sortMenu}>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  option.value === sortBy && styles.sortOptionSelected,
                ]}
                onPress={() => handleSortSelect(option.value)}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    option.value === sortBy && styles.sortOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Wishlist Content */}
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
          <Text style={styles.emptyText}>
            Add movies to your wishlist to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedWishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => handleMoviePress(item)}
              showRemoveButton
              onRemove={() => handleRemove(item.id)}
            />
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
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  joinedDate: {
    fontSize: 12,
    color: '#E3F2FD',
  },
  titleSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  filterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  filterValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  filterIcon: {
    fontSize: 10,
    color: '#666',
  },
  sortOrderButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortOrderIcon: {
    fontSize: 20,
    color: '#333',
  },
  sortMenu: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  sortOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  sortOptionSelected: {
    backgroundColor: '#E3F2FD',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#333',
  },
  sortOptionTextSelected: {
    color: '#2196F3',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});