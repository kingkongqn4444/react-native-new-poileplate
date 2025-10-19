/**
 * Home Screen with React Query & Infinite Scroll
 * Main screen showing movies by category with search functionality
 */

import React, { useState, useMemo } from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMovieStore, sortMovies } from '@/stores/movieStore';
import { useInfiniteMovies, useSearchMovies, flattenInfiniteQueryData } from '@/hooks/useMovies';
import { Dropdown, LoadingSpinner, ErrorMessage } from '@/components/common';
import { MovieCard } from '@/components/movie';
import type { Movie, MovieCategory, SortOption } from '@/types/movie.types';
import * as S from './HomeScreen.styled';

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
    preferences,
    setCategory,
    setSortBy,
  } = useMovieStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Use infinite query for category movies
  const moviesQuery = useInfiniteMovies(preferences.category);

  // Use infinite query for search
  const searchMoviesQuery = useSearchMovies(searchQuery, searchQuery.length > 0);

  // Determine which query to use
  const activeQuery = searchQuery ? searchMoviesQuery : moviesQuery;

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  } = activeQuery;

  // Flatten pages into single array
  const movies = useMemo(() => flattenInfiniteQueryData<Movie>(data), [data]);

  // Sort movies based on preferences
  const sortedMovies = useMemo(
    () => sortMovies(movies, preferences.sortBy, preferences.sortOrder) as Movie[],
    [movies, preferences.sortBy, preferences.sortOrder]
  );

  const handleSearch = () => {
    setSearchQuery(localSearchQuery);
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

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  // Render footer for load more indicator
  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <S.LoadMoreContainer>
        <ActivityIndicator size="small" color="#E50914" />
        <S.LoadMoreText>Loading more movies...</S.LoadMoreText>
      </S.LoadMoreContainer>
    );
  };

  // Initial loading state
  if (isLoading && movies.length === 0) {
    return <LoadingSpinner message="Loading movies..." />;
  }

  // Error state
  if (error && movies.length === 0) {
    return (
      <ErrorMessage
        message="Failed to load movies"
        onRetry={handleRefresh}
      />
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.LogoContainer>
          <S.Logo>TMDB</S.Logo>
          <S.LogoSubtitle>MOVIE APP</S.LogoSubtitle>
        </S.LogoContainer>
      </S.Header>

      <S.FiltersContainer>
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

        <S.SearchContainer>
          <S.SearchInput
            placeholder="Search movies..."
            value={localSearchQuery}
            onChangeText={setLocalSearchQuery}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#999"
          />
        </S.SearchContainer>

        <S.SearchButton onPress={handleSearch}>
          <S.SearchButtonText>Search</S.SearchButtonText>
        </S.SearchButton>
      </S.FiltersContainer>

      {sortedMovies.length === 0 ? (
        <S.EmptyContainer>
          <S.EmptyText>
            {searchQuery
              ? 'No movies found for your search'
              : 'No movies available'}
          </S.EmptyText>
        </S.EmptyContainer>
      ) : (
        <FlatList
          data={sortedMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
          )}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isFetchingNextPage}
              onRefresh={handleRefresh}
              tintColor="#E50914"
              colors={['#E50914']}
            />
          }
        />
      )}
    </S.Container>
  );
};