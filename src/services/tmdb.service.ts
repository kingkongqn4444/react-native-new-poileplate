/**
 * TMDB API Service
 * Handles all API calls to The Movie Database
 */

import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '../config/api.config';
import type {
  MoviesResponse,
  MovieDetails,
  MovieCredits,
  MovieCategory,
  MovieReleaseDatesResponse,
} from '../types/movie.types';

class TMDBService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.TMDB_BASE_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_CONFIG.TMDB_API_KEY}`,
      },
    });
  }

  /**
   * Get movies by category (now_playing, upcoming, popular)
   */
  async getMoviesByCategory(
    category: MovieCategory,
    page: number = 1
  ): Promise<MoviesResponse> {
    const response = await this.api.get<MoviesResponse>(`/movie/${category}`, {
      params: { page },
    });
    return response.data;
  }

  /**
   * Get now playing movies
   */
  async getNowPlayingMovies(page: number = 1): Promise<MoviesResponse> {
    return this.getMoviesByCategory('now_playing', page);
  }

  /**
   * Get upcoming movies
   */
  async getUpcomingMovies(page: number = 1): Promise<MoviesResponse> {
    return this.getMoviesByCategory('upcoming', page);
  }

  /**
   * Get popular movies
   */
  async getPopularMovies(page: number = 1): Promise<MoviesResponse> {
    return this.getMoviesByCategory('popular', page);
  }

  /**
   * Search movies by keyword
   */
  async searchMovies(
    query: string,
    page: number = 1
  ): Promise<MoviesResponse> {
    if (!query.trim()) {
      return {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }

    const response = await this.api.get<MoviesResponse>('/search/movie', {
      params: { query, page },
    });
    return response.data;
  }

  /**
   * Get movie details by ID
   */
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const response = await this.api.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  }

  /**
   * Get movie credits (cast and crew)
   */
  async getMovieCredits(movieId: number): Promise<MovieCredits> {
    const response = await this.api.get<MovieCredits>(
      `/movie/${movieId}/credits`
    );
    return response.data;
  }

  /**
   * Get movie release dates (for rating like PG-13)
   */
  async getMovieReleaseDates(
    movieId: number
  ): Promise<MovieReleaseDatesResponse> {
    const response = await this.api.get<MovieReleaseDatesResponse>(
      `/movie/${movieId}/release_dates`
    );
    return response.data;
  }

  /**
   * Get recommended movies for a specific movie
   */
  async getRecommendedMovies(
    movieId: number,
    page: number = 1
  ): Promise<MoviesResponse> {
    const response = await this.api.get<MoviesResponse>(
      `/movie/${movieId}/recommendations`,
      { params: { page } }
    );
    return response.data;
  }

  /**
   * Get account details (for username and joined date on wishlist screen)
   * Note: This requires authentication. For demo purposes, we'll return mock data
   */
  async getAccountDetails() {
    // In a real app, you would need to authenticate first
    // For this demo, returning mock data
    return {
      username: 'John Lee',
      joined_date: '2023-01-15',
    };
  }
}

export const tmdbService = new TMDBService();