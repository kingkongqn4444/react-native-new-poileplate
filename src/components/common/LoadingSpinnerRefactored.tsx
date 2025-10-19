/**
 * Loading Spinner Component with Styled Components
 */

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './LoadingSpinner.styled';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
}) => {
  const theme = useTheme();

  return (
    <S.Container>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {message && <S.Message>{message}</S.Message>}
    </S.Container>
  );
};