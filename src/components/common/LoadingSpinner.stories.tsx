import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { LoadingSpinner } from './LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Common/LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {
    message: {
      control: 'text',
    },
  },
  args: {
    message: 'Loading...',
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {
    message: 'Loading...',
  },
};

export const CustomMessage: Story = {
  args: {
    message: 'Loading movies...',
  },
};

export const NoMessage: Story = {
  args: {
    message: undefined,
  },
};

export const LongMessage: Story = {
  args: {
    message: 'Please wait while we fetch your personalized movie recommendations...',
  },
};