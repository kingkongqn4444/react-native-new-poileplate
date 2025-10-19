import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-ondevice-actions';
import styled from 'styled-components/native';

// Create a simple Button component for demo
const StyledButton = styled.TouchableOpacity<{ variant?: 'primary' | 'secondary' }>`
  background-color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.background.secondary : theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  align-items: center;
  justify-content: center;
  min-width: 120px;
`;

const ButtonText = styled.Text<{ variant?: 'primary' | 'secondary' }>`
  color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.text.primary : theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button = ({ title, onPress, variant = 'primary', disabled }: ButtonProps) => (
  <StyledButton onPress={onPress} variant={variant} disabled={disabled}>
    <ButtonText variant={variant}>{title}</ButtonText>
  </StyledButton>
);

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    onPress: {
      action: 'pressed',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    title: 'Button',
    variant: 'primary',
    disabled: false,
    onPress: action('button-press'),
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    title: 'Button with Very Long Text',
  },
};