# 🧪 Testing Guide

## Quick Test Checklist

Hướng dẫn test nhanh để verify tất cả features hoạt động đúng.

---

## ✅ 1. Git Hooks Testing

### Test Pre-commit Hook (Lint-staged)

```bash
# 1. Create a test file with bad formatting
echo "const   test    =     'hello'" > test.js

# 2. Stage the file
git add test.js

# 3. Try to commit
git commit -m "test: testing pre-commit hook"

# Expected:
# ✔ Prettier will auto-format the file
# ✔ ESLint will check for errors
# ✔ Commit proceeds if no errors
```

### Test Commit-msg Hook (Commitlint)

```bash
# ❌ Test bad commit message
git commit --allow-empty -m "bad commit"
# Expected: Error - type may not be empty

# ❌ Test invalid type
git commit --allow-empty -m "update: something"
# Expected: Error - update is not a valid type

# ✅ Test good commit message
git commit --allow-empty -m "feat(test): testing commitlint"
# Expected: Success - commit created

# ✅ Test with scope
git commit --allow-empty -m "fix(api): resolve timeout"
# Expected: Success - commit created
```

### Verify Hooks Are Working

```bash
# Check hooks are installed
ls -la .husky/
# Should see: pre-commit, commit-msg

# Check hooks are executable
ls -l .husky/pre-commit .husky/commit-msg
# Should see: -rwxr-xr-x (executable)

# Test lint-staged manually
npx lint-staged
```

---

## ✅ 2. Application Testing

### Start the App

```bash
# iOS
npm run ios

# Android
npm run android
```

### Test Home Screen

**Category Dropdown:**
1. Tap "Category" dropdown
2. Select "Now Playing" → Should load now playing movies
3. Select "Upcoming" → Should load upcoming movies
4. Select "Popular" → Should load popular movies
5. Close and reopen app → Category should be remembered

**Sort Functionality:**
1. Tap "Sort by" dropdown
2. Select "By alphabetical order" → Movies sorted A-Z
3. Select "By rating" → Movies sorted by vote average
4. Select "By release date" → Movies sorted by date
5. Close and reopen app → Sort preference should be remembered

**Search:**
1. Type "Barbie" in search box
2. Tap "Search" button
3. Should show Barbie movies
4. Clear search → Should return to category view

**Loading States:**
1. On first load → Should see "Loading movies..." spinner
2. On search → Should show loading state
3. On error → Should show error message with retry button

### Test Details Screen

**Navigate to Details:**
1. From Home screen, tap any movie card
2. Should navigate to Details screen

**Verify Information:**
- [ ] Movie title displayed
- [ ] Year of release shown
- [ ] Movie rating (e.g., PG-13) visible
- [ ] Poster image loaded
- [ ] Backdrop image loaded
- [ ] Release date shown
- [ ] Runtime displayed
- [ ] Genres listed
- [ ] Status shown
- [ ] Original language shown
- [ ] Director name (if available)
- [ ] Writer name (if available)
- [ ] User score percentage
- [ ] Tagline (if available)
- [ ] Overview text

**Cast Members:**
1. Scroll to "Cast Members" section
2. Should see horizontal carousel
3. Each cast member shows:
   - Profile photo (or placeholder)
   - Name
   - Character name

**Watchlist Button:**
1. Tap "Add to Watchlist" → Should change to "Remove from Watchlist"
2. Navigate to Wishlist tab → Movie should be there
3. Go back to Details → Tap "Remove from Watchlist"
4. Navigate to Wishlist → Movie should be removed

**Recommended Movies:**
1. Scroll to "Recommended Movies"
2. Should see horizontal carousel
3. Tap a recommended movie
4. Should navigate to that movie's details

### Test Wishlist Screen

**Navigate to Wishlist:**
1. Tap "Wishlist" tab in bottom navigation
2. Should see Wishlist screen

**User Profile:**
- [ ] User avatar shows "JL"
- [ ] Username shows "John Lee"
- [ ] Joined date shows "Joined Jan 15, 2023"

**Empty State:**
1. If wishlist empty → Should see empty state message
2. "Your Wishlist is Empty"
3. "Add movies to your wishlist to see them here"

**Add Movies:**
1. Go to Home or Details
2. Add 3-4 movies to wishlist
3. Return to Wishlist → All movies should be there

**Filter & Sort:**
1. Tap "Filter by" → Should show dropdown
2. Select "Alphabetical order" → Movies sorted A-Z
3. Select "Rating" → Movies sorted by rating
4. Select "Release date" → Movies sorted by date

**Sort Order Toggle:**
1. Tap arrow button (↓)
2. Should change to (↑)
3. Movies should reverse order
4. Tap again → Should toggle back

**Remove from Wishlist:**
1. Tap X button on any movie card
2. Movie should be removed immediately
3. Wishlist count should update

**Persistence:**
1. Add movies to wishlist
2. Close app completely
3. Reopen app
4. Navigate to Wishlist → Movies should still be there

**Navigate to Details:**
1. Tap any movie in wishlist
2. Should navigate to Details screen
3. "Remove from Watchlist" button should show

---

## ✅ 3. State Management Testing

### Global Loading State

```typescript
// In HomeScreen
const { isLoading, setIsLoading } = useMovieStore();

// Should work:
setIsLoading(true);  // Shows loading
setIsLoading(false); // Hides loading
```

### Global Error State

```typescript
const { error, setError, clearError } = useMovieStore();

// Should work:
setError('Test error');  // Shows error
clearError();            // Removes error
```

### Wishlist Persistence

```bash
# 1. Add movies to wishlist
# 2. Check MMKV storage
npx react-native-mmkv info
# Should see stored data

# 3. Close and reopen app
# Wishlist should persist
```

### Preferences Persistence

```bash
# 1. Change category to "Popular"
# 2. Change sort to "By rating"
# 3. Close and reopen app
# Both should be remembered
```

---

## ✅ 4. Theme System Testing

### Verify Theme Provider

```typescript
// In any component
import { useTheme } from 'styled-components/native';

const MyComponent = () => {
  const theme = useTheme();
  console.log(theme.colors.primary); // Should log: #2196F3
};
```

### Test Styled Components

```typescript
// Should have theme access
const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
`;
```

### Check Color Consistency

1. Navigate through all screens
2. Verify colors are consistent:
   - Primary blue (#2196F3)
   - White backgrounds
   - Dark text (#333)
   - Gray secondary text (#666)

---

## ✅ 5. Error Handling Testing

### Network Error

```bash
# 1. Turn off WiFi/Data
# 2. Try to load movies
# Expected: Error message with retry button
# 3. Turn WiFi back on
# 4. Tap "Retry"
# Expected: Movies load successfully
```

### API Error

```bash
# 1. Use invalid API key (edit .env)
# 2. Reload app
# Expected: Error message displayed
# 3. Restore correct API key
# 4. Reload app
# Expected: Works normally
```

### Empty Results

```bash
# 1. Search for "asdfqwerzxcv" (gibberish)
# Expected: "No movies found for your search"
# 2. Clear search
# Expected: Return to normal list
```

---

## ✅ 6. Performance Testing

### Loading Speed

```bash
# Measure app startup time
time npm run ios

# Should be:
# - First load: < 30s
# - Subsequent loads: < 10s
```

### List Scrolling

1. Load Popular movies (many items)
2. Scroll quickly up and down
3. Expected: Smooth scrolling (60fps)
4. No lag or stuttering

### Image Loading

1. Navigate to movie details
2. Observe image loading
3. Expected: Progressive loading
4. Placeholder while loading

### Memory Usage

```bash
# Check for memory leaks
# 1. Navigate between screens 10+ times
# 2. Add/remove from wishlist multiple times
# 3. Search multiple times

# App should not crash or slow down
```

---

## ✅ 7. TypeScript Validation

### Check Types

```bash
# Run TypeScript compiler
npx tsc --noEmit

# Expected: No errors
```

### Test Type Safety

```typescript
// Should show TypeScript errors:
const store = useMovieStore();
store.setIsLoading("true"); // ❌ Error: should be boolean
store.setError(123);        // ❌ Error: should be string | null

// Should work:
store.setIsLoading(true);   // ✅
store.setError("Error");    // ✅
```

---

## ✅ 8. Code Quality Testing

### Run Linter

```bash
# Check for linting issues
npm run lint

# Expected: No errors or warnings
```

### Run Prettier

```bash
# Check code formatting
npx prettier --check "src/**/*.{ts,tsx}"

# Expected: All files properly formatted
```

### Test Pre-commit

```bash
# 1. Make a change with bad formatting
echo "const x=1;const y=2;" > src/test.ts

# 2. Stage and commit
git add src/test.ts
git commit -m "test: testing lint-staged"

# Expected:
# ✔ File auto-formatted
# ✔ Commit proceeds
```

---

## 🐛 Known Issues & Solutions

### Issue: Hooks not running

**Solution:**
```bash
chmod +x .husky/pre-commit .husky/commit-msg
npx husky install
```

### Issue: Metro bundler errors

**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: Images not loading

**Solution:**
- Check internet connection
- Verify TMDB_API_KEY in .env
- Restart Metro bundler

### Issue: TypeScript errors

**Solution:**
```bash
rm -rf node_modules
npm install
npx tsc --noEmit
```

---

## 📊 Test Results Template

```markdown
## Test Results - [Date]

### ✅ Git Hooks
- [ ] Pre-commit hook working
- [ ] Commit-msg validation working
- [ ] Lint-staged auto-formatting
- [ ] Commitlint type validation

### ✅ Application Features
- [ ] Home screen loads
- [ ] Category dropdown works
- [ ] Sort functionality works
- [ ] Search functionality works
- [ ] Details screen shows all info
- [ ] Cast carousel works
- [ ] Wishlist add/remove works
- [ ] Wishlist persistence works
- [ ] Filter/sort on wishlist works

### ✅ Technical
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Theme system working
- [ ] Global state working
- [ ] No console errors
- [ ] No memory leaks

### ✅ Performance
- [ ] App startup < 30s
- [ ] Smooth scrolling
- [ ] Images load properly
- [ ] No lag or stuttering

### Issues Found
- None / [List any issues]

### Notes
- [Any additional notes]
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All features working
- [ ] Performance acceptable
- [ ] Error handling working
- [ ] API key secured
- [ ] Git hooks working
- [ ] Documentation updated
- [ ] Version bumped

---

**Happy Testing!** 🧪✨