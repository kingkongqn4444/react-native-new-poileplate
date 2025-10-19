/**
 * Movie Type Definitions for TMDB API
 */

export type MovieCategory = 'now_playing' | 'upcoming' | 'popular';

export type SortOption = 'alphabetical' | 'rating' | 'release_date';

export type SortOrder = 'asc' | 'desc';

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  gender: number | null;
  known_for_department: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  gender: number | null;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  dates?: {
    maximum: string;
    minimum: string;
  };
}

export interface MovieRating {
  iso_3166_1: string;
  release_dates: Array<{
    certification: string;
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
  }>;
}

export interface MovieReleaseDatesResponse {
  id: number;
  results: MovieRating[];
}

// Local storage types
export interface MoviePreferences {
  category: MovieCategory;
  sortBy: SortOption;
  sortOrder: SortOrder;
}

export interface WishlistMovie extends Movie {
  addedAt: number; // timestamp
}