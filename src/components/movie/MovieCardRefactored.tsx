/**
 * Movie Card Component with Styled Components
 * Displays movie information in a card format
 */

import React from 'react';
import type { Movie } from '../../types/movie.types';
import { getImageUrl, IMAGE_SIZES } from '../../config/api.config';
import * as S from './MovieCard.styled';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  showRemoveButton = false,
  onRemove,
}) => {
  const posterUrl = getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER.MEDIUM);

  return (
    <S.Card onPress={onPress}>
      <S.PosterContainer>
        {posterUrl ? (
          <S.Poster source={{ uri: posterUrl }} />
        ) : (
          <S.PosterPlaceholder>
            <S.PosterPlaceholderText>No Image</S.PosterPlaceholderText>
          </S.PosterPlaceholder>
        )}
      </S.PosterContainer>

      <S.InfoContainer>
        <S.Title numberOfLines={2}>{movie.title}</S.Title>
        <S.ReleaseDate>
          {movie.release_date
            ? new Date(movie.release_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Release date unknown'}
        </S.ReleaseDate>
        <S.Overview numberOfLines={3}>
          {movie.overview || 'No overview available'}
        </S.Overview>
      </S.InfoContainer>

      {showRemoveButton && onRemove && (
        <S.RemoveButton onPress={onRemove}>
          <S.RemoveButtonText>✕</S.RemoveButtonText>
        </S.RemoveButton>
      )}
    </S.Card>
  );
};