/**
 * Dropdown Styled Components
 */

import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const Selector = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const SelectedText = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Arrow = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.overlay.dark};
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  width: 80%;
  max-height: 50%;
  overflow: hidden;
`;

export const Option = styled.TouchableOpacity<{ selected?: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primaryLight : theme.colors.white};
`;

export const OptionText = styled.Text<{ selected?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.text.primary};
  font-weight: ${({ theme, selected }) =>
    selected ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular};
`;