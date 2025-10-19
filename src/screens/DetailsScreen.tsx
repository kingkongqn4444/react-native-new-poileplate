/**
 * Movie Details Screen
 * Shows detailed information about a selected movie
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useMovieStore } from '../stores/movieStore';
import { tmdbService } from '../services/tmdb.service';
import { getImageUrl, IMAGE_SIZES } from '../config/api.config';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import type {
  MovieDetails,
  MovieCredits,
  CastMember,
  CrewMember,
  Movie,
} from '../types/movie.types';

const { width } = Dimensions.get('window');

type DetailsScreenRouteProp = RouteProp<
  { Details: { movieId: number } },
  'Details'
>;

export const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation();
  const { movieId } = route.params;

  const { isInWishlist, addToWishlist, removeFromWishlist } = useMovieStore();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certification, setCertification] = useState<string>('');

  const inWishlist = movie ? isInWishlist(movie.id) : false;

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const [movieData, creditsData, releaseDatesData, recommendationsData] =
        await Promise.all([
          tmdbService.getMovieDetails(movieId),
          tmdbService.getMovieCredits(movieId),
          tmdbService.getMovieReleaseDates(movieId),
          tmdbService.getRecommendedMovies(movieId),
        ]);

      setMovie(movieData);
      setCredits(creditsData);
      setRecommendations(recommendationsData.results.slice(0, 5));

      // Get US certification (rating like PG-13)
      const usRelease = releaseDatesData.results.find(
        (r) => r.iso_3166_1 === 'US'
      );
      if (usRelease && usRelease.release_dates.length > 0) {
        const cert = usRelease.release_dates[0].certification;
        setCertification(cert || 'NR');
      }
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Failed to load movie details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    if (!movie) return;

    if (inWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie as Movie);
    }
  };

  const handleRecommendationPress = (recommendedMovie: Movie) => {
    navigation.navigate('Details', { movieId: recommendedMovie.id });
  };

  if (loading) {
    return <LoadingSpinner message="Loading movie details..." />;
  }

  if (error || !movie) {
    return (
      <ErrorMessage
        message={error || 'Movie not found'}
        onRetry={fetchMovieDetails}
      />
    );
  }

  const backdropUrl = getImageUrl(
    movie.backdrop_path,
    IMAGE_SIZES.BACKDROP.LARGE
  );
  const posterUrl = getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER.LARGE);

  // Get director and writer from crew
  const director = credits?.crew.find((c: CrewMember) => c.job === 'Director');
  const writer = credits?.crew.find((c: CrewMember) => c.job === 'Writer');

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Backdrop Image */}
        {backdropUrl && (
          <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
        )}

        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            {posterUrl && (
              <Image source={{ uri: posterUrl }} style={styles.poster} />
            )}

            <View style={styles.headerInfo}>
              <Text style={styles.title}>{movie.title}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{releaseYear}</Text>
                {certification && (
                  <>
                    <Text style={styles.metaDivider}>•</Text>
                    <Text style={styles.metaText}>{certification}</Text>
                  </>
                )}
              </View>
            </View>
          </View>

          {/* Basic Info */}
          <View style={styles.infoSection}>
            <InfoRow label="Release Date" value={movie.release_date} />
            <InfoRow
              label="Run Time"
              value={movie.runtime ? `${movie.runtime} min` : 'N/A'}
            />
            <InfoRow
              label="Genre(s)"
              value={movie.genres.map((g) => g.name).join(', ')}
            />
            <InfoRow label="Status" value={movie.status} />
            <InfoRow
              label="Original Language"
              value={movie.original_language.toUpperCase()}
            />
          </View>

          {/* Credits */}
          {(director || writer) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Credits</Text>
              {director && <InfoRow label="Director" value={director.name} />}
              {writer && <InfoRow label="Writer" value={writer.name} />}
            </View>
          )}

          {/* User Score */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Score</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreCircle}>
                {Math.round(movie.vote_average * 10)}%
              </Text>
            </View>
          </View>

          {/* Tagline */}
          {movie.tagline && (
            <View style={styles.section}>
              <Text style={styles.tagline}>"{movie.tagline}"</Text>
            </View>
          )}

          {/* Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>

          {/* Wishlist Button */}
          <TouchableOpacity
            style={[
              styles.wishlistButton,
              inWishlist && styles.wishlistButtonActive,
            ]}
            onPress={handleWishlistToggle}
          >
            <Text style={styles.wishlistButtonText}>
              {inWishlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Text>
          </TouchableOpacity>

          {/* Cast Members */}
          {credits && credits.cast.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cast Members</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.castScroll}
              >
                {credits.cast.slice(0, 10).map((cast: CastMember) => (
                  <View key={cast.id} style={styles.castCard}>
                    {cast.profile_path ? (
                      <Image
                        source={{
                          uri: getImageUrl(
                            cast.profile_path,
                            IMAGE_SIZES.PROFILE.MEDIUM
                          ),
                        }}
                        style={styles.castImage}
                      />
                    ) : (
                      <View style={[styles.castImage, styles.castImagePlaceholder]}>
                        <Text style={styles.castPlaceholderText}>
                          {cast.name.charAt(0)}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.castName} numberOfLines={2}>
                      {cast.name}
                    </Text>
                    <Text style={styles.castCharacter} numberOfLines={2}>
                      {cast.character}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Recommended Movies */}
          {recommendations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended Movies</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.recommendationsScroll}
              >
                {recommendations.map((rec) => (
                  <TouchableOpacity
                    key={rec.id}
                    style={styles.recommendationCard}
                    onPress={() => handleRecommendationPress(rec)}
                  >
                    {rec.poster_path ? (
                      <Image
                        source={{
                          uri: getImageUrl(
                            rec.poster_path,
                            IMAGE_SIZES.POSTER.MEDIUM
                          ),
                        }}
                        style={styles.recommendationPoster}
                      />
                    ) : (
                      <View
                        style={[
                          styles.recommendationPoster,
                          styles.recommendationPlaceholder,
                        ]}
                      >
                        <Text style={styles.recommendationPlaceholderText}>
                          No Image
                        </Text>
                      </View>
                    )}
                    <Text style={styles.recommendationTitle} numberOfLines={2}>
                      {rec.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backdrop: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  headerSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  metaDivider: {
    marginHorizontal: 8,
    color: '#666',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    width: 140,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  scoreContainer: {
    alignItems: 'flex-start',
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 60,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  overview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  wishlistButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  wishlistButtonActive: {
    backgroundColor: '#FF5722',
  },
  wishlistButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  castScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  castCard: {
    width: 100,
    marginRight: 12,
  },
  castImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  castImagePlaceholder: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  castPlaceholderText: {
    fontSize: 32,
    color: '#999',
    fontWeight: 'bold',
  },
  castName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  castCharacter: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  recommendationsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  recommendationCard: {
    width: 120,
    marginRight: 12,
  },
  recommendationPoster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendationPlaceholder: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationPlaceholderText: {
    fontSize: 12,
    color: '#999',
  },
  recommendationTitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});