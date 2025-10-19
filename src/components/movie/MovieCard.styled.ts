/**
 * Movie Card Styled Components
 */

import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

export const Card = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  overflow: hidden;
  width: ${CARD_WIDTH}px;
  ${({ theme }) => `
    shadow-color: ${theme.shadows.md.shadowColor};
    shadow-offset: ${theme.shadows.md.shadowOffset.width}px ${theme.shadows.md.shadowOffset.height}px;
    shadow-opacity: ${theme.shadows.md.shadowOpacity};
    shadow-radius: ${theme.shadows.md.shadowRadius}px;
    elevation: ${theme.shadows.md.elevation};
  `}
`;

export const PosterContainer = styled.View`
  width: 100px;
  height: 150px;
`;

export const Poster = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export const PosterPlaceholder = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray300};
  justify-content: center;
  align-items: center;
`;

export const PosterPlaceholderText = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const ReleaseDate = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const Overview = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.fontSize.sm * theme.typography.lineHeight.normal}px;
`;

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm}px;
  right: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.overlay.darker};
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  justify-content: center;
  align-items: center;
`;

export const RemoveButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;