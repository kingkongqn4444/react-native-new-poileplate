/**
 * Error Message Component with Styled Components
 */

import React from 'react';
import * as S from './ErrorMessage.styled';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  return (
    <S.Container>
      <S.ErrorIcon>⚠️</S.ErrorIcon>
      <S.Message>{message}</S.Message>
      {onRetry && (
        <S.RetryButton onPress={onRetry}>
          <S.RetryButtonText>Retry</S.RetryButtonText>
        </S.RetryButton>
      )}
    </S.Container>
  );
};