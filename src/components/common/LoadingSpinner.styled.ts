/**
 * Loading Spinner Styled Components
 */

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export const Message = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;