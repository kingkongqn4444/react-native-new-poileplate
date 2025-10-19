/**
 * Movie Card Component
 * Displays movie information in a card format
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import type { Movie } from '../../types/movie.types';
import { getImageUrl, IMAGE_SIZES } from '../../config/api.config';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // 16px padding on each side

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  showRemoveButton = false,
  onRemove,
}) => {
  const posterUrl = getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER.MEDIUM);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.posterContainer}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={styles.poster} />
        ) : (
          <View style={[styles.poster, styles.posterPlaceholder]}>
            <Text style={styles.posterPlaceholderText}>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.releaseDate}>
          {movie.release_date
            ? new Date(movie.release_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Release date unknown'}
        </Text>
        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview || 'No overview available'}
        </Text>
      </View>

      {showRemoveButton && onRemove && (
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: CARD_WIDTH,
  },
  posterContainer: {
    width: 100,
    height: 150,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  posterPlaceholder: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterPlaceholderText: {
    color: '#999',
    fontSize: 12,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  overview: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});