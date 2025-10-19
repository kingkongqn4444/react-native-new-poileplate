# 📝 Commit Guidelines

## 🎯 Overview

Project này sử dụng **Conventional Commits** specification với **Husky**, **lint-staged**, và **commitlint** để đảm bảo code quality và commit message consistency.

## 🔧 Tools Setup

### 1. Husky
- Git hooks manager
- Chạy scripts trước khi commit và push

### 2. Lint-staged
- Chạy linters trên staged files
- Format code automatically
- Fix ESLint issues

### 3. Commitlint
- Validate commit messages
- Enforce conventional commits
- Đảm bảo commit history clean

## 📋 Conventional Commits Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Required Format
```
type(scope): subject
```

**Example:**
```
feat(auth): add login functionality
fix(api): resolve timeout issue
docs(readme): update installation guide
```

## 🏷 Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(movie): add movie details screen` |
| `fix` | Bug fix | `fix(api): handle network errors` |
| `docs` | Documentation only | `docs(readme): update setup guide` |
| `style` | Code style changes (formatting) | `style(components): fix indentation` |
| `refactor` | Code refactoring | `refactor(store): use Zustand for state` |
| `perf` | Performance improvements | `perf(list): optimize FlatList rendering` |
| `test` | Adding/updating tests | `test(api): add unit tests for service` |
| `build` | Build system/dependencies | `build(deps): upgrade React Native` |
| `ci` | CI/CD changes | `ci(github): add workflow for tests` |
| `chore` | Other changes | `chore(husky): setup git hooks` |
| `revert` | Revert previous commit | `revert: revert feat(auth)` |

## ✅ Good Commit Messages

### ✓ DO

```bash
# Feature
feat(home): add category dropdown selector

# Bug fix
fix(movie-card): resolve image loading issue

# Documentation
docs(api): add TMDB endpoints documentation

# Refactoring
refactor(theme): migrate to styled-components

# Performance
perf(images): use FastImage for optimization

# Multiple types
feat(wishlist): add and remove movies
- Implement add to wishlist button
- Add remove from wishlist functionality
- Persist wishlist to local storage
```

### ✗ DON'T

```bash
# Too vague
update code

# Not following convention
Added new feature

# No type
movie details screen

# All caps
FIX BUG IN API

# Too long subject (>100 chars)
feat(home): add category dropdown selector with now playing upcoming and popular options and search functionality
```

## 📝 Commit Message Structure

### Subject Line
- **Max 100 characters**
- **Lowercase** (recommended)
- **No period** at the end
- **Imperative mood** ("add" not "added" or "adds")

```bash
✓ feat(auth): add login functionality
✗ feat(auth): Added login functionality.
✗ feat(auth): Adds login functionality
```

### Body (Optional)
- Explain **what** and **why** (not how)
- Wrap at **100 characters per line**
- Separate from subject with blank line

```bash
feat(movie): add movie recommendations

Implement horizontal carousel for recommended movies on
details screen. Uses TMDB recommendations API endpoint.
Improves user engagement and discovery.
```

### Footer (Optional)
- Reference issues
- Breaking changes
- Related PRs

```bash
feat(api): migrate to new TMDB endpoint

BREAKING CHANGE: API base URL changed
Closes #123
See also: #456
```

## 🚀 Git Hooks Workflow

### Pre-commit Hook
Runs **before** creating a commit:

```bash
1. Staged files detected
2. ESLint --fix (auto-fix issues)
3. Prettier --write (format code)
4. Commit proceeds if no errors
```

**What it checks:**
- ✅ Linting errors (ESLint)
- ✅ Code formatting (Prettier)
- ✅ TypeScript errors
- ✅ Import sorting

### Commit-msg Hook
Runs **after** writing commit message:

```bash
1. Commit message written
2. Commitlint validates format
3. Commit proceeds if valid
```

**What it checks:**
- ✅ Conventional commits format
- ✅ Type is valid
- ✅ Subject length (<100 chars)
- ✅ Message structure

## 💻 Usage Examples

### Normal Commit
```bash
git add .
git commit -m "feat(home): add search functionality"
# ✓ Pre-commit runs → formats code
# ✓ Commit-msg runs → validates message
# ✓ Commit created
```

### Commit Will Fail If:
```bash
# ✗ Bad commit message
git commit -m "update code"
# Error: subject may not be empty

# ✗ Linting errors
git commit -m "feat(home): add feature"
# Error: ESLint found errors

# ✗ Invalid type
git commit -m "update(home): add feature"
# Error: type must be one of [feat, fix, docs, ...]
```

### Bypass Hooks (NOT RECOMMENDED)
```bash
# Skip all hooks
git commit --no-verify -m "emergency fix"

# Only for emergencies!
```

## 🛠 Configuration Files

### `.husky/pre-commit`
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### `.husky/commit-msg`
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

### `.lintstagedrc.js`
```javascript
module.exports = {
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.json': ['prettier --write'],
  '*.md': ['prettier --write'],
};
```

### `commitlint.config.js`
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore', 'revert'
    ]],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
};
```

## 🎨 Scopes (Optional but Recommended)

Common scopes for this project:

- `auth` - Authentication features
- `home` - Home screen
- `details` - Movie details screen
- `wishlist` - Wishlist screen
- `api` - API service layer
- `store` - State management (Zustand)
- `theme` - Theming and styles
- `components` - Reusable components
- `navigation` - Navigation setup
- `config` - Configuration files

**Example:**
```bash
feat(auth): implement login flow
fix(api): handle timeout errors
refactor(store): migrate to Zustand
style(theme): update color palette
```

## 📊 Commit History Example

Good commit history:
```
* feat(wishlist): add filter and sort functionality
* fix(movie-card): resolve image aspect ratio
* refactor(theme): migrate to styled-components
* docs(readme): update installation guide
* perf(list): optimize FlatList rendering
* test(api): add integration tests
* chore(deps): update dependencies
```

## 🔍 Troubleshooting

### Husky hooks not running?
```bash
# Reinstall Husky
npm install
npx husky install

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### Commitlint failing?
```bash
# Check your commit message format
git commit -m "type(scope): subject"

# Verify commitlint config
npx commitlint --from HEAD~1 --to HEAD --verbose
```

### Lint-staged errors?
```bash
# Run ESLint manually
npm run lint

# Run Prettier manually
npx prettier --write "src/**/*.{ts,tsx}"
```

### Want to skip hooks temporarily?
```bash
# Use --no-verify (only for emergencies!)
git commit --no-verify -m "message"
```

## 📚 Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitlint](https://commitlint.js.org/)
- [Husky](https://typicode.github.io/husky/)
- [Lint-staged](https://github.com/okonet/lint-staged)

## ✨ Benefits

### Code Quality
- ✅ Auto-format code before commit
- ✅ Catch linting errors early
- ✅ Consistent code style

### Commit History
- ✅ Clean, readable history
- ✅ Easy to understand changes
- ✅ Simple to generate changelogs
- ✅ Better collaboration

### Automation
- ✅ No manual linting needed
- ✅ Automatic code formatting
- ✅ Enforced standards

## 🎯 Quick Reference

```bash
# Commit types quick guide
feat     → New feature
fix      → Bug fix
docs     → Documentation
style    → Code formatting
refactor → Code restructuring
perf     → Performance
test     → Tests
build    → Dependencies
ci       → CI/CD
chore    → Maintenance
revert   → Revert commit

# Commit format
type(scope): subject

# Example
feat(movie): add details screen
```

---

**Happy Committing!** 🎉✨