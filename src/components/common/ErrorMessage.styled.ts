/**
 * Error Message Styled Components
 */

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export const ErrorIcon = styled.Text`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Message = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const RetryButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${({ theme }) => theme.spacing.xxl}px;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

export const RetryButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;