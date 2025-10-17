#!/bin/bash

# Script to create PR after Zustand integration
# Run this script after fixing GitHub authentication

echo "🚀 Creating PR for Zustand Store Integration..."

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "integrate/init-library" ]; then
    echo "❌ Please switch to integrate/init-library branch first"
    exit 1
fi

# Push the branch
echo "📤 Pushing branch to origin..."
git push origin integrate/init-library

if [ $? -eq 0 ]; then
    echo "✅ Branch pushed successfully!"
    
    # Create PR using GitHub CLI (if available)
    if command -v gh &> /dev/null; then
        echo "🔗 Creating PR using GitHub CLI..."
        gh pr create \
            --title "feat: Integrate Zustand Store with Complete State Management" \
            --body "## 🎉 Zustand Store Integration

This PR integrates a comprehensive Zustand store architecture for React Native state management.

### ✨ Features Added

- **AuthStore**: Complete authentication with login/logout/token management
- **UserStore**: User profile management and updates  
- **SettingsStore**: App settings with theme switching
- **Persistent Storage**: AsyncStorage integration for data persistence
- **TypeScript Support**: Full type safety with interfaces
- **Custom Hooks**: Easy-to-use hooks for store access
- **Theme System**: Light/Dark/System theme support
- **Form Validation**: Input validation utilities
- **Example Screens**: Login, Profile, and Settings screens
- **StoreProvider**: App-level store integration
- **Documentation**: Comprehensive README and examples

### 🏗️ Architecture

\`\`\`
src/
├── stores/          # Zustand stores
├── hooks/           # Custom hooks
├── types/           # TypeScript types
├── utils/           # Utility functions
├── screens/         # Example screens
└── components/      # Reusable components
\`\`\`

### 🚀 Usage

\`\`\`typescript
import { useAuth, useSettings } from './src/hooks';

function MyComponent() {
  const { isAuthenticated, login } = useAuth();
  const { theme, toggleTheme } = useSettings();
  
  return (
    <View>
      {isAuthenticated ? <Text>Welcome!</Text> : <LoginButton />}
    </View>
  );
}
\`\`\`

### 📦 Dependencies Added

- \`zustand\`: State management
- \`@react-native-async-storage/async-storage\`: Persistent storage

### ✅ Testing

- All stores tested and working
- TypeScript compilation successful
- Example screens functional
- Persistent storage working

### 📚 Documentation

Complete documentation available in \`src/README.md\` with:
- Architecture overview
- Usage examples
- API reference
- Configuration guide

Ready for review and merge! 🚀" \
            --base develop \
            --head integrate/init-library
    else
        echo "📝 GitHub CLI not available. Please create PR manually:"
        echo "   https://github.com/kingkongqn4444/react-native-new-poileplate/compare/develop...integrate/init-library"
    fi
else
    echo "❌ Failed to push branch. Please check your GitHub authentication."
    echo "💡 Try: git config --global user.name 'Your Name'"
    echo "💡 Try: git config --global user.email 'your.email@example.com'"
    echo "💡 Or use GitHub CLI: gh auth login"
fi
