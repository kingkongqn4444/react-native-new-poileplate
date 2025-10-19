# Storybook for React Native Guide

## 🎨 Overview

Storybook is an interactive component development environment that allows you to:
- Develop UI components in isolation
- Browse a component library
- Test different component states
- Share components across your team
- Document component usage

## 📦 Installed Packages

- `@storybook/react-native` - Core Storybook for React Native
- `@storybook/addon-ondevice-controls` - Interactive controls for props
- `@storybook/addon-ondevice-actions` - Track component interactions
- `@react-native-async-storage/async-storage` - Required dependency
- `react-native-safe-area-context` - Required dependency

---

## 🚀 Getting Started

### Running Storybook

#### iOS:
```bash
npm run storybook:ios
```

#### Android:
```bash
npm run storybook:android
```

#### Just start the Metro bundler (if app is already running):
```bash
npm run storybook
```

### Running the Main App

To run the regular app (not Storybook):
```bash
npm run ios
# or
npm run android
```

---

## 📁 Project Structure

```
.storybook/
├── main.ts              # Storybook configuration
├── preview.tsx          # Global decorators and parameters
├── Storybook.tsx        # Storybook UI component
└── storybook.requires.ts # Auto-loader for stories

src/
├── components/
│   ├── common/
│   │   ├── LoadingSpinner.tsx
│   │   ├── LoadingSpinner.stories.tsx  ✨
│   │   ├── Button.stories.tsx          ✨
│   │   └── ...
│   └── movie/
│       ├── MovieCard.tsx
│       ├── MovieCard.stories.tsx       ✨
│       └── ...

storybook.tsx           # Storybook entry point
index.js                # Conditional loading (App vs Storybook)
```

---

## ✍️ Writing Stories

### Basic Story Structure

Create a file with `.stories.tsx` extension next to your component:

```typescript
// MyComponent.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { action } from '@storybook/addon-ondevice-actions';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
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
  },
  args: {
    title: 'Default Title',
    variant: 'primary',
    onPress: action('button-press'),
  },
};

export default meta;

type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    title: 'Click me',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
  },
};
```

### Story Organization

Use the `title` field to organize stories in a hierarchy:

```typescript
const meta: Meta<typeof Component> = {
  title: 'Common/Button',          // Creates: Common > Button
  // or
  title: 'Movie/MovieCard',        // Creates: Movie > MovieCard
  // or
  title: 'Screens/Home/Header',    // Creates: Screens > Home > Header
};
```

---

## 🎛️ Controls (Interactive Props)

### Text Input
```typescript
argTypes: {
  title: {
    control: 'text',
  },
}
```

### Number Input
```typescript
argTypes: {
  count: {
    control: { type: 'number', min: 0, max: 100, step: 1 },
  },
}
```

### Boolean Toggle
```typescript
argTypes: {
  isVisible: {
    control: 'boolean',
  },
}
```

### Select Dropdown
```typescript
argTypes: {
  variant: {
    control: {
      type: 'select',
    },
    options: ['primary', 'secondary', 'danger'],
  },
}
```

### Color Picker
```typescript
argTypes: {
  backgroundColor: {
    control: 'color',
  },
}
```

---

## 🎬 Actions

Track component interactions using actions:

```typescript
import { action } from '@storybook/addon-ondevice-actions';

const meta: Meta<typeof Button> = {
  argTypes: {
    onPress: {
      action: 'pressed',
    },
  },
  args: {
    onPress: action('button-pressed'),
  },
};
```

When you interact with the component, you'll see the action logged in the Actions panel.

---

## 🎨 Decorators

### Global Decorators

Applied to all stories (configured in `.storybook/preview.tsx`):

```typescript
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1, padding: 16, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    </ThemeProvider>
  ),
];
```

### Local Decorators

Applied to specific stories:

```typescript
const meta: Meta<typeof Component> = {
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: '#000', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};
```

---

## 📖 Example Stories

### LoadingSpinner Story

Location: [src/components/common/LoadingSpinner.stories.tsx](src/components/common/LoadingSpinner.stories.tsx)

```typescript
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
```

### Button Story

Location: [src/components/common/Button.stories.tsx](src/components/common/Button.stories.tsx)

```typescript
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
```

### MovieCard Story

Location: [src/components/movie/MovieCard.stories.tsx](src/components/movie/MovieCard.stories.tsx)

```typescript
const mockMovie: Movie = {
  id: 550,
  title: 'Fight Club',
  overview: 'A ticking-time-bomb insomniac...',
  poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  release_date: '1999-10-15',
  vote_average: 8.4,
};

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
```

---

## 🔧 Advanced Usage

### Multiple Variants in One Story

```typescript
export const AllVariants: Story = {
  render: (args) => (
    <View>
      <Button {...args} variant="primary" title="Primary" />
      <Button {...args} variant="secondary" title="Secondary" />
      <Button {...args} variant="danger" title="Danger" />
    </View>
  ),
};
```

### Responsive Previews

```typescript
export const ResponsiveGrid: Story = {
  render: (args) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <MovieCard key={i} {...args} />
      ))}
    </View>
  ),
};
```

### State Management in Stories

```typescript
export const Stateful: Story = {
  render: (args) => {
    const [count, setCount] = React.useState(0);
    return (
      <Button
        {...args}
        title={`Clicked ${count} times`}
        onPress={() => setCount(count + 1)}
      />
    );
  },
};
```

---

## 📱 Using Storybook

### Navigation

1. **Story List**: Browse all available stories
2. **Story View**: See the rendered component
3. **Controls Panel**: Adjust props interactively
4. **Actions Panel**: See logged interactions

### Controls Panel

- **Edit props**: Change values in real-time
- **Reset**: Click reset icon to restore defaults
- **Copy**: Copy current prop values

### Actions Panel

- **View events**: See all fired actions
- **Clear**: Clear action history
- **Inspect**: Click actions to see details

---

## 🎯 Best Practices

### 1. Cover All States

Create stories for different component states:

```typescript
export const Loading: Story = {
  args: { isLoading: true },
};

export const Error: Story = {
  args: { error: 'Something went wrong' },
};

export const Empty: Story = {
  args: { data: [] },
};

export const WithData: Story = {
  args: { data: mockData },
};
```

### 2. Use Realistic Data

Use realistic mock data that represents actual usage:

```typescript
const mockMovie: Movie = {
  id: 550,
  title: 'Fight Club',
  // Complete, realistic data
};
```

### 3. Document Edge Cases

```typescript
export const LongTitle: Story = {
  args: {
    title: 'The Lord of the Rings: The Fellowship of the Ring Extended Edition',
  },
};

export const NoImage: Story = {
  args: {
    poster_path: '',
  },
};
```

### 4. Use Actions for Callbacks

```typescript
import { action } from '@storybook/addon-ondevice-actions';

export const Default: Story = {
  args: {
    onPress: action('button-pressed'),
    onRemove: action('remove-clicked'),
  },
};
```

### 5. Keep Stories Simple

Each story should focus on one specific use case:

```typescript
// ✅ Good
export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

// ❌ Bad - too many variants in one story
export const AllVariantsAtOnce: Story = {
  args: { variant: 'all' }, // unclear
};
```

---

## 🚨 Troubleshooting

### Storybook Not Loading

**Problem**: App shows regular screen instead of Storybook

**Solution**:
```bash
# Make sure STORYBOOK_ENABLED is set
STORYBOOK_ENABLED=true npm run ios

# Or use the script
npm run storybook:ios
```

### Stories Not Appearing

**Problem**: New stories don't show up

**Solution**:
1. Make sure file ends with `.stories.tsx`
2. Check file is in `src/` directory
3. Restart Metro bundler:
   ```bash
   # Kill Metro
   # Run again: npm run storybook:ios
   ```

### Controls Not Working

**Problem**: Can't change props in Controls panel

**Solution**:
Make sure you have `argTypes` defined:
```typescript
const meta: Meta<typeof Component> = {
  argTypes: {
    myProp: {
      control: 'text', // or 'boolean', 'select', etc.
    },
  },
};
```

### Actions Not Showing

**Problem**: Actions panel empty

**Solution**:
```typescript
import { action } from '@storybook/addon-ondevice-actions';

// Use in args
args: {
  onPress: action('pressed'),
}
```

---

## 📚 Additional Resources

- [Storybook for React Native Docs](https://github.com/storybookjs/react-native)
- [Storybook Addons](https://storybook.js.org/addons)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Controls Addon](https://storybook.js.org/docs/react/essentials/controls)

---

## 🎓 Quick Reference

### Create a New Story

1. Create file: `ComponentName.stories.tsx`
2. Import dependencies:
   ```typescript
   import type { Meta, StoryObj } from '@storybook/react-native';
   import { MyComponent } from './MyComponent';
   ```
3. Define meta:
   ```typescript
   const meta: Meta<typeof MyComponent> = {
     title: 'Category/ComponentName',
     component: MyComponent,
   };
   export default meta;
   ```
4. Create stories:
   ```typescript
   type Story = StoryObj<typeof MyComponent>;

   export const Default: Story = {
     args: { prop: 'value' },
   };
   ```

### Common ArgTypes

```typescript
argTypes: {
  text: { control: 'text' },
  number: { control: 'number' },
  boolean: { control: 'boolean' },
  color: { control: 'color' },
  select: {
    control: { type: 'select' },
    options: ['option1', 'option2'],
  },
  onPress: { action: 'pressed' },
}
```

---

## ✨ Summary

Storybook is now fully integrated into your React Native project! You can:

- ✅ Run Storybook with `npm run storybook:ios` or `npm run storybook:android`
- ✅ Create stories for any component using `.stories.tsx` files
- ✅ Use interactive controls to modify props
- ✅ Track actions and events
- ✅ Switch between app and Storybook easily

Happy component development! 🚀