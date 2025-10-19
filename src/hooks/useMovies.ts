/**
 * React Query Hooks for Movie API
 * Handles data fetching, caching, error handling, and infinite scroll
 */

import { useQuery, useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import { tmdbService } from '@/services/tmdb.service';
import { useNotificationStore } from '@/stores/notificationStore';
import type {
  MovieCategory,
  MovieDetails,
  MoviesResponse,
  MovieCredits
} from '@/types/movie.types';

// Query Keys
export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (category: MovieCategory, page?: number) =>
    [...movieKeys.lists(), category, page] as const,
  details: () => [...movieKeys.all, 'detail'] as const,
  detail: (id: number) => [...movieKeys.details(), id] as const,
  credits: (id: number) => [...movieKeys.all, 'credits', id] as const,
  recommendations: (id: number) => [...movieKeys.all, 'recommendations', id] as const,
  search: () => [...movieKeys.all, 'search'] as const,
  searchQuery: (query: string, page?: number) =>
    [...movieKeys.search(), query, page] as const,
};

/**
 * Hook to fetch movies by category with pagination
 */
export const useMovies = (
  category: MovieCategory,
  options?: Omit<UseQueryOptions<MoviesResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  const { handleApiError } = useNotificationStore();

  const query = useQuery<MoviesResponse, Error>({
    queryKey: movieKeys.list(category, 1),
    queryFn: () => tmdbService.getMoviesByCategory(category),
    ...options,
  });

  // Handle errors with useEffect
  useEffect(() => {
    if (query.error) {
      handleApiError(query.error, 'Failed to fetch movies');
    }
  }, [query.error, handleApiError]);

  return query;
};

/**
 * Hook to fetch movies with infinite scroll
 */
export const useInfiniteMovies = (category: MovieCategory) => {
  const { handleApiError } = useNotificationStore();

  const query = useInfiniteQuery<MoviesResponse, Error>({
    queryKey: movieKeys.list(category),
    queryFn: ({ pageParam = 1 }) =>
      tmdbService.getMoviesByCategory(category, pageParam as number),
    getNextPageParam: (lastPage) => {
      // TMDB API has max 500 pages
      if (lastPage.page < lastPage.total_pages && lastPage.page < 500) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.page > 1) {
        return firstPage.page - 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Handle errors with useEffect
  useEffect(() => {
    if (query.error) {
      handleApiError(query.error, 'Failed to load more movies');
    }
  }, [query.error, handleApiError]);

  return query;
};

/**
 * Hook to search movies with infinite scroll
 */
export const useSearchMovies = (query: string, enabled: boolean = true) => {
  const { handleApiError } = useNotificationStore();

  const queryResult = useInfiniteQuery<MoviesResponse, Error>({
    queryKey: movieKeys.searchQuery(query),
    queryFn: ({ pageParam = 1 }) =>
      tmdbService.searchMovies(query, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages && lastPage.page < 500) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.page > 1) {
        return firstPage.page - 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: enabled && query.length > 0,
  });

  // Handle errors with useEffect
  useEffect(() => {
    if (queryResult.error) {
      handleApiError(queryResult.error, 'Search failed');
    }
  }, [queryResult.error, handleApiError]);

  return queryResult;
};

/**
 * Hook to fetch movie details
 */
export const useMovieDetails = (movieId: number) => {
  const { handleApiError } = useNotificationStore();

  const query = useQuery<MovieDetails, Error>({
    queryKey: movieKeys.detail(movieId),
    queryFn: () => tmdbService.getMovieDetails(movieId),
    enabled: !!movieId,
  });

  // Handle errors with useEffect
  useEffect(() => {
    if (query.error) {
      handleApiError(query.error, 'Failed to fetch movie details');
    }
  }, [query.error, handleApiError]);

  return query;
};

/**
 * Hook to fetch movie credits (cast & crew)
 */
export const useMovieCredits = (movieId: number) => {
  const { handleApiError } = useNotificationStore();

  const query = useQuery<MovieCredits, Error>({
    queryKey: movieKeys.credits(movieId),
    queryFn: () => tmdbService.getMovieCredits(movieId),
    enabled: !!movieId,
  });

  // Handle errors with useEffect
  useEffect(() => {
    if (query.error) {
      handleApiError(query.error, 'Failed to fetch movie credits');
    }
  }, [query.error, handleApiError]);

  return query;
};

/**
 * Hook to fetch movie recommendations
 */
export const useMovieRecommendations = (movieId: number) => {
  const query = useQuery<MoviesResponse, Error>({
    queryKey: movieKeys.recommendations(movieId),
    queryFn: () => tmdbService.getRecommendedMovies(movieId),
    enabled: !!movieId,
  });

  // Don't show error for recommendations as it's not critical
  useEffect(() => {
    if (query.error) {
      console.error('Failed to fetch recommendations:', query.error);
    }
  }, [query.error]);

  return query;
};

/**
 * Helper to flatten infinite query pages into a single array
 */
export const flattenInfiniteQueryData = <T,>(data: { pages: { results: T[] }[] } | undefined): T[] => {
  if (!data) return [];
  return data.pages.flatMap((page) => page.results);
};

/**
 * Helper to get total results count from infinite query
 */
export const getInfiniteQueryTotal = (data: { pages: { total_results: number }[] } | undefined): number => {
  if (!data || data.pages.length === 0) return 0;
  return data.pages[0].total_results;
};