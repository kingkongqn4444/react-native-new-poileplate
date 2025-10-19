/**
 * API Configuration
 * IMPORTANT: Create a .env file with your TMDB API credentials
 */

import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '@env';

export const API_CONFIG = {
  TMDB_API_KEY: TMDB_API_KEY || '',
  TMDB_BASE_URL: TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
};

// Image size configurations
export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    ORIGINAL: 'original',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original',
  },
  PROFILE: {
    SMALL: 'w45',
    MEDIUM: 'w185',
    LARGE: 'h632',
    ORIGINAL: 'original',
  },
};

/**
 * Helper function to get full image URL
 */
export const getImageUrl = (
  path: string | null,
  size: string = IMAGE_SIZES.POSTER.MEDIUM
): string => {
  if (!path) return '';
  return `${API_CONFIG.TMDB_IMAGE_BASE_URL}/${size}${path}`;
};