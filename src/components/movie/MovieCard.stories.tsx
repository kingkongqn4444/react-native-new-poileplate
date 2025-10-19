import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-ondevice-actions';
import { MovieCard } from './MovieCard';
import type { Movie } from '@/types/movie.types';

// Mock movie data
const mockMovie: Movie = {
  id: 550,
  title: 'Fight Club',
  overview:
    'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
  poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  backdrop_path: '/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg',
  release_date: '1999-10-15',
  vote_average: 8.4,
  vote_count: 26280,
  genre_ids: [18],
  popularity: 61.416,
  original_language: 'en',
  original_title: 'Fight Club',
  adult: false,
  video: false,
};

const mockMovieNoImage: Movie = {
  ...mockMovie,
  id: 551,
  title: 'Movie Without Poster',
  poster_path: '',
  overview: 'This movie has no poster image available.',
};

const mockMovieLongTitle: Movie = {
  ...mockMovie,
  id: 552,
  title: 'The Lord of the Rings: The Fellowship of the Ring Extended Edition',
  overview: 'A very long movie title that should be truncated in the card.',
};

const meta: Meta<typeof MovieCard> = {
  title: 'Movie/MovieCard',
  component: MovieCard,
  argTypes: {
    onPress: {
      action: 'pressed',
    },
    onRemove: {
      action: 'removed',
    },
    showRemoveButton: {
      control: 'boolean',
    },
  },
  args: {
    movie: mockMovie,
    onPress: action('movie-press'),
    showRemoveButton: false,
  },
};

export default meta;

type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {
  args: {
    movie: mockMovie,
  },
};

export const WithRemoveButton: Story = {
  args: {
    movie: mockMovie,
    showRemoveButton: true,
    onRemove: action('remove-button-press'),
  },
};

export const NoImage: Story = {
  args: {
    movie: mockMovieNoImage,
  },
};

export const LongTitle: Story = {
  args: {
    movie: mockMovieLongTitle,
  },
};

export const NoOverview: Story = {
  args: {
    movie: {
      ...mockMovie,
      overview: '',
    },
  },
};

export const HighRating: Story = {
  args: {
    movie: {
      ...mockMovie,
      vote_average: 9.8,
      title: 'Highly Rated Movie',
    },
  },
};

export const LowRating: Story = {
  args: {
    movie: {
      ...mockMovie,
      vote_average: 2.1,
      title: 'Low Rated Movie',
    },
  },
};