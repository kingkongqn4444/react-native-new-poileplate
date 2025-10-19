# Splash Screen Setup Guide

## React Native BootSplash Integration

This guide explains how to set up and customize the splash screen for the TMDB Movie App.

## 📦 Package Installed

```bash
npm install react-native-bootsplash --legacy-peer-deps
```

## ✅ What's Already Configured

### 1. App.tsx Integration
The splash screen is automatically hidden after app initialization:

```typescript
import BootSplash from 'react-native-bootsplash';

useEffect(() => {
  const init = async () => {
    initialize();
    await BootSplash.hide({ fade: true });
  };
  init();
}, []);
```

### 2. iOS Configuration (AppDelegate.swift)
```swift
import RNBootSplash

RNBootSplash.initWithStoryboard("BootSplash", rootView: window!.rootViewController!.view)
```

### 3. Android Configuration (MainActivity.kt)
```kotlin
import com.zoontek.rnbootsplash.RNBootSplash

override fun onCreate(savedInstanceState: Bundle?) {
  RNBootSplash.init(this, R.style.BootTheme)
  super.onCreate(savedInstanceState)
}
```

## 🎨 Generate Splash Screen Assets

### Step 1: Prepare Your Logo

Create a logo file (PNG or SVG) with these specifications:
- **Size**: 512x512px or larger
- **Format**: PNG with transparent background (recommended) or SVG
- **Content**: Centered logo/icon
- **Location**: Save to `assets/bootsplash_logo.png`

**Logo Design Tips:**
- Use a simple, clear icon that represents your app
- Keep it centered with padding around edges
- For this movie app, consider:
  - Film reel icon
  - Play button
  - Movie camera
  - Popcorn icon
  - Custom app branding

### Step 2: Generate Assets

Run the generator command with your preferred background color:

```bash
# Default white background
npx react-native generate-bootsplash assets/bootsplash_logo.png \
  --background-color=#FFFFFF \
  --logo-width=100 \
  --assets-output=assets/bootsplash

# Dark background for movie theme
npx react-native generate-bootsplash assets/bootsplash_logo.png \
  --background-color=#000000 \
  --logo-width=120 \
  --assets-output=assets/bootsplash

# Netflix-style red background
npx react-native generate-bootsplash assets/bootsplash_logo.png \
  --background-color=#E50914 \
  --logo-width=120 \
  --assets-output=assets/bootsplash
```

### Step 3: Install iOS Pods

```bash
cd ios && pod install && cd ..
```

### Step 4: Rebuild the App

```bash
# For iOS
npm run ios

# For Android
npm run android
```

## 🎨 Customization Options

### Background Colors

Choose a background color that matches your app theme:

```bash
# White background
--background-color=#FFFFFF

# Black background (cinema theme)
--background-color=#000000

# Netflix red
--background-color=#E50914

# Dark blue
--background-color=#0F1B2C

# Custom brand color
--background-color=#YOUR_COLOR
```

### Logo Size

Adjust the logo width (in dp at @1x):

```bash
# Small logo
--logo-width=80

# Medium logo (recommended)
--logo-width=100

# Large logo
--logo-width=150
```

### Dark Mode Support (Premium Feature)

For dark mode support, you need a license key:

```bash
npx react-native generate-bootsplash assets/logo.png \
  --background-color=#FFFFFF \
  --dark-background=#000000 \
  --dark-logo=assets/logo-dark.png \
  --license-key=YOUR_LICENSE_KEY
```

## 📱 Generated Files

The generator will create:

### iOS
- `ios/react_native_boileplate/BootSplash.storyboard`
- `ios/react_native_boileplate/Images.xcassets/BootSplashLogo.imageset/`

### Android
- `android/app/src/main/res/drawable/bootsplash_logo.xml`
- `android/app/src/main/res/values/colors.xml` (updated)
- `android/app/src/main/res/values/styles.xml` (BootTheme added)

## 🎬 Hide Splash Screen

### Basic Usage (Already Implemented)
```typescript
import BootSplash from 'react-native-bootsplash';

// Simple hide with fade animation
await BootSplash.hide({ fade: true });
```

### Custom Timing
```typescript
// Hide after minimum duration
setTimeout(async () => {
  await BootSplash.hide({ fade: true, duration: 500 });
}, 2000);
```

### Conditional Hide
```typescript
// Hide after data is loaded
const loadData = async () => {
  try {
    await fetchMovies();
    await fetchCategories();
  } finally {
    await BootSplash.hide({ fade: true });
  }
};
```

## 🔧 Troubleshooting

### iOS Build Errors

If you get build errors on iOS:

1. Install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

2. Clean build:
   ```bash
   cd ios && xcodebuild clean && cd ..
   ```

3. Rebuild:
   ```bash
   npm run ios
   ```

### Android Build Errors

If you get build errors on Android:

1. Clean gradle:
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

2. Rebuild:
   ```bash
   npm run android
   ```

### Splash Screen Not Showing

1. Make sure you ran the generator command
2. Verify native code changes are in place
3. Rebuild the app (don't use fast refresh)
4. Check that `BootSplash.hide()` is being called

### Splash Screen Stuck

Make sure `BootSplash.hide()` is called:
- After app initialization
- In a try-finally block to ensure it's always called
- Not blocked by an error

## 📖 Quick Start Example

Here's a complete example to get started:

### 1. Create a Simple Logo

Open [generate-logo.html](./generate-logo.html) in a browser to generate a basic movie-themed logo.

### 2. Run Generator

```bash
npx react-native generate-bootsplash assets/logo.png \
  --background-color=#E50914 \
  --logo-width=120
```

### 3. Install Pods & Rebuild

```bash
cd ios && pod install && cd ..
npm run ios
# or
npm run android
```

## 🎨 Recommended Theme for Movie App

Based on our app's Netflix-inspired design:

```bash
npx react-native generate-bootsplash assets/movie-logo.png \
  --background-color=#E50914 \
  --logo-width=120 \
  --assets-output=assets/bootsplash
```

**Logo suggestions:**
- Film reel with play button
- Movie camera silhouette
- Popcorn bucket
- Film strip
- Custom app name/branding

## 📚 Additional Resources

- [react-native-bootsplash Documentation](https://github.com/zoontek/react-native-bootsplash)
- [Logo Design Tools](https://www.figma.com/)
- [Free Icon Resources](https://www.flaticon.com/)

## ✨ Next Steps

1. Create or download a logo for your app
2. Run the generator with your preferred settings
3. Install iOS pods
4. Rebuild the app to see your splash screen
5. Customize colors and timing as needed

---

**Note:** The splash screen assets must be generated using the CLI tool. The native configuration code is already in place - you just need to run the generator with your logo file!