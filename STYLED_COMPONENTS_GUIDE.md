# Styled Components Implementation Guide

## 🎨 Overview

Ứng dụng đã được refactor để sử dụng **styled-components** với hệ thống **theme** hoàn chỉnh, mang lại các lợi ích:

- ✅ **Type-safe styling** với TypeScript
- ✅ **Centralized theme** dễ dàng maintain
- ✅ **Reusable styles** với theme tokens
- ✅ **Better developer experience** với auto-completion
- ✅ **Clean component code** tách biệt logic và styling

## 📂 Theme Structure

```
src/theme/
├── colors.ts          # Color palette
├── spacing.ts         # Spacing system (4px grid)
├── typography.ts      # Font sizes, weights, line heights
├── borderRadius.ts    # Border radius values
├── shadows.ts         # Shadow presets
├── styled.d.ts        # TypeScript declarations
└── index.ts           # Theme exports
```

### Theme Configuration

#### Colors
```typescript
// Primary colors
theme.colors.primary      // #2196F3
theme.colors.primaryDark  // #1976D2
theme.colors.primaryLight // #E3F2FD

// Text colors
theme.colors.text.primary   // #333333
theme.colors.text.secondary // #666666
theme.colors.text.tertiary  // #999999

// Background colors
theme.colors.background.primary   // #FFFFFF
theme.colors.background.secondary // #F5F5F5
```

#### Spacing (4px grid system)
```typescript
theme.spacing.xs    // 4px
theme.spacing.sm    // 8px
theme.spacing.md    // 12px
theme.spacing.lg    // 16px
theme.spacing.xl    // 20px
theme.spacing.xxl   // 24px
theme.spacing.xxxl  // 32px
```

#### Typography
```typescript
// Font sizes
theme.typography.fontSize.sm   // 12px
theme.typography.fontSize.md   // 14px
theme.typography.fontSize.lg   // 16px
theme.typography.fontSize.xl   // 18px
theme.typography.fontSize.xxl  // 20px
theme.typography.fontSize.xxxl // 24px

// Font weights
theme.typography.fontWeight.regular  // '400'
theme.typography.fontWeight.medium   // '500'
theme.typography.fontWeight.semibold // '600'
theme.typography.fontWeight.bold     // '700'
```

#### Border Radius
```typescript
theme.borderRadius.sm   // 4px
theme.borderRadius.md   // 8px
theme.borderRadius.lg   // 12px
theme.borderRadius.xl   // 16px
theme.borderRadius.full // 9999px (circular)
```

#### Shadows
```typescript
theme.shadows.sm  // Subtle shadow
theme.shadows.md  // Medium shadow (card default)
theme.shadows.lg  // Large shadow
theme.shadows.xl  // Extra large shadow
```

## 🏗 Component Structure

Mỗi component được tổ chức thành 2 files:

1. **ComponentName.styled.ts** - Styled components
2. **ComponentName.tsx** - Logic component

### Example: Dropdown Component

#### Dropdown.styled.ts
```typescript
import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Selector = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;
```

#### Dropdown.tsx
```typescript
import React from 'react';
import * as S from './Dropdown.styled';

export const Dropdown: React.FC<Props> = ({ label, options }) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Selector>
        {/* ... */}
      </S.Selector>
    </S.Container>
  );
};
```

## 📦 Refactored Components

### Common Components
- ✅ **Dropdown** - `src/components/common/DropdownRefactored.tsx`
- ✅ **LoadingSpinner** - `src/components/common/LoadingSpinnerRefactored.tsx`
- ✅ **ErrorMessage** - `src/components/common/ErrorMessageRefactored.tsx`

### Movie Components
- ✅ **MovieCard** - `src/components/movie/MovieCardRefactored.tsx`

### Screens
- ✅ **HomeScreen** - `src/screens/Home/HomeScreen.tsx`
- 🚧 **DetailsScreen** - (Có thể refactor thêm)
- 🚧 **WishlistScreen** - (Có thể refactor thêm)

## 🎯 Usage Examples

### 1. Accessing Theme in Styled Components
```typescript
const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;
```

### 2. Conditional Styling
```typescript
const Option = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primaryLight : theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;
```

### 3. Using Theme in Component Logic
```typescript
import { useTheme } from 'styled-components/native';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <ActivityIndicator color={theme.colors.primary} />
  );
};
```

### 4. Shadows
```typescript
const Card = styled.View`
  ${({ theme }) => `
    shadow-color: ${theme.shadows.md.shadowColor};
    shadow-offset: ${theme.shadows.md.shadowOffset.width}px ${theme.shadows.md.shadowOffset.height}px;
    shadow-opacity: ${theme.shadows.md.shadowOpacity};
    shadow-radius: ${theme.shadows.md.shadowRadius}px;
    elevation: ${theme.shadows.md.elevation};
  `}
`;
```

## 🔧 Best Practices

### 1. Always Use Theme Tokens
❌ **Bad:**
```typescript
const Text = styled.Text`
  color: #333333;
  font-size: 14px;
  margin-bottom: 8px;
`;
```

✅ **Good:**
```typescript
const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;
```

### 2. Organize Styled Components
```typescript
// Group related components
export const Container = styled.View`...`;
export const Header = styled.View`...`;
export const Title = styled.Text`...`;
export const Description = styled.Text`...`;
```

### 3. Use Semantic Naming
```typescript
// ❌ Bad
export const BlueButton = styled.TouchableOpacity`...`;
export const BigText = styled.Text`...`;

// ✅ Good
export const PrimaryButton = styled.TouchableOpacity`...`;
export const Title = styled.Text`...`;
```

### 4. Extract Reusable Styles
```typescript
// Create base components
const BaseButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

// Extend for variations
export const PrimaryButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.secondary};
`;
```

## 📱 Migration Guide

### Old Style (StyleSheet)
```typescript
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
</View>
```

### New Style (Styled Components)
```typescript
const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

<Container>
  <Title>Hello</Title>
</Container>
```

## 🎨 Theming Benefits

### 1. Consistency
- All components use the same color palette
- Spacing follows a consistent grid system
- Typography is standardized

### 2. Maintainability
- Easy to update colors globally
- Change spacing system in one place
- Type-safe with TypeScript

### 3. Dark Mode Ready
```typescript
// Easy to add dark theme in the future
const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: {
      primary: '#1a1a1a',
      secondary: '#2a2a2a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
};
```

## 🚀 Next Steps

### Optional Enhancements

1. **Complete Screen Refactoring**
   - Refactor DetailsScreen
   - Refactor WishlistScreen

2. **Add Dark Mode**
   - Create dark theme
   - Add theme switcher
   - Persist theme preference

3. **Create Shared Components**
   - Button variants
   - Input fields
   - Cards
   - Modals

4. **Add Animations**
   - Use styled-components with react-native-reanimated
   - Smooth transitions

## 📝 TypeScript Support

Theme is fully typed with TypeScript:

```typescript
import { DefaultTheme } from 'styled-components/native';

// Access theme types
const Button = styled.TouchableOpacity<{ variant: 'primary' | 'secondary' }>`
  background-color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.colors.primary
      : theme.colors.secondary};
`;
```

## 🎉 Summary

Styled-components implementation mang lại:

- ✨ **Cleaner code** - Tách biệt styles và logic
- 🎨 **Better theming** - Centralized theme system
- 📱 **Responsive** - Easy to adjust for different screen sizes
- 🔒 **Type-safe** - Full TypeScript support
- 🚀 **Scalable** - Easy to maintain và extend

---

**Happy Coding!** 🎨✨