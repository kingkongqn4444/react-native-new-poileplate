/**
 * Home Screen Styled Components
 */

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.lg}px;
  align-items: center;
`;

export const LogoContainer = styled.View`
  align-items: center;
`;

export const Logo = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
`;

export const LogoSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.widest}px;
`;

export const FiltersContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border.light};
`;

export const SearchContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const SearchInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SearchButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md + 2}px;
  align-items: center;
`;

export const SearchButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const ListContent = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export const EmptyText = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const LoadMoreContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;
  justify-content: center;
`;

export const LoadMoreText = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;