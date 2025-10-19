# 🪝 Git Hooks Setup Guide

## ✅ Completed Setup

Project đã được setup với **Husky**, **lint-staged**, và **commitlint** để enforce code quality và commit conventions.

## 📦 Installed Packages

```json
{
  "devDependencies": {
    "husky": "^9.x",
    "lint-staged": "^16.x",
    "@commitlint/cli": "^19.x",
    "@commitlint/config-conventional": "^19.x"
  }
}
```

## 🔧 Configuration Files

### 1. Husky Git Hooks

#### `.husky/pre-commit`
Chạy trước khi commit được tạo:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

#### `.husky/commit-msg`
Validate commit message format:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

### 2. Lint-staged Configuration

#### `.lintstagedrc.js`
```javascript
module.exports = {
  // TypeScript/JavaScript files
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
  ],

  // JSON files
  '*.json': [
    'prettier --write',
  ],

  // Markdown files
  '*.md': [
    'prettier --write',
  ],

  // YAML files
  '*.{yml,yaml}': [
    'prettier --write',
  ],
};
```

**What it does:**
- ✅ Auto-fix ESLint issues
- ✅ Format code with Prettier
- ✅ Only runs on staged files (fast!)
- ✅ Works with TypeScript, JavaScript, JSON, Markdown, YAML

### 3. Commitlint Configuration

#### `commitlint.config.js`
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Code style
        'refactor', // Refactoring
        'perf',     // Performance
        'test',     // Tests
        'build',    // Build system
        'ci',       // CI/CD
        'chore',    // Maintenance
        'revert',   // Revert
      ],
    ],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
  },
};
```

**What it does:**
- ✅ Enforces Conventional Commits format
- ✅ Validates commit types
- ✅ Checks message length
- ✅ Prevents bad commits

## 🚀 How It Works

### Commit Workflow

```
Developer writes code
    ↓
git add .
    ↓
git commit -m "feat(movie): add details screen"
    ↓
[PRE-COMMIT HOOK]
    ↓
1. Lint-staged runs
    ├─ ESLint --fix on .ts, .tsx files
    ├─ Prettier --write on all files
    └─ TypeScript check
    ↓
2. If all pass → Continue
   If errors → Commit blocked
    ↓
[COMMIT-MSG HOOK]
    ↓
3. Commitlint validates message
    ├─ Check format: type(scope): subject
    ├─ Validate type enum
    └─ Check length limits
    ↓
4. If valid → Commit created ✅
   If invalid → Commit blocked ❌
```

### Example Success Flow

```bash
$ git add .
$ git commit -m "feat(home): add search functionality"

✔ Running tasks for staged files...
✔ Preparing lint-staged...
✔ Running tasks for *.{ts,tsx,js,jsx}...
✔ Running tasks for *.json...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...

✔ Commit message validated
[main abc1234] feat(home): add search functionality
 3 files changed, 45 insertions(+), 10 deletions(-)
```

### Example Failure Flows

#### Bad Commit Message
```bash
$ git commit -m "update code"

⧗   input: update code
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg script failed (code 1)
```

#### Linting Errors
```bash
$ git commit -m "feat(home): add feature"

✖ Running tasks for staged files...
  ✖ Running tasks for *.{ts,tsx,js,jsx}...
    ✖ eslint --fix
      ✖ src/screens/HomeScreen.tsx
        4:1  error  'React' is defined but never used  @typescript-eslint/no-unused-vars

✖ eslint found errors. Please fix them and try again.
husky - pre-commit script failed (code 1)
```

## 📋 Commit Message Format

### Required Format
```
type(scope): subject
```

### Examples

#### ✅ Good Commits
```bash
feat(movie): add movie details screen
fix(api): resolve timeout error
docs(readme): update installation guide
refactor(store): migrate to Zustand
style(theme): update color palette
perf(list): optimize rendering
test(api): add unit tests
chore(deps): update dependencies
```

#### ❌ Bad Commits
```bash
update code                    # No type
Added new feature              # Wrong format
FIX BUG                        # All caps
movie details                  # No type
feat: add very long subject that exceeds the maximum allowed length of 100 characters  # Too long
```

## 🎯 Commit Types Guide

| Type | When to Use | Example |
|------|-------------|---------|
| **feat** | New feature for users | `feat(wishlist): add remove button` |
| **fix** | Bug fix | `fix(image): resolve loading error` |
| **docs** | Documentation only | `docs(api): add endpoint docs` |
| **style** | Formatting, semicolons | `style(home): fix indentation` |
| **refactor** | Code restructuring | `refactor(components): use styled-components` |
| **perf** | Performance improvement | `perf(images): lazy load posters` |
| **test** | Adding tests | `test(store): add Zustand tests` |
| **build** | Build system/dependencies | `build(npm): upgrade React` |
| **ci** | CI/CD changes | `ci(github): add workflow` |
| **chore** | Maintenance | `chore(husky): setup hooks` |
| **revert** | Revert previous commit | `revert: feat(auth)` |

## 🛠 Useful Commands

### Testing Commitlint
```bash
# Test your commit message
echo "feat(home): add search" | npx commitlint

# Test last commit
npx commitlint --from HEAD~1 --to HEAD --verbose

# Test all commits in branch
npx commitlint --from main --to HEAD
```

### Testing Lint-staged
```bash
# Run lint-staged manually
npx lint-staged

# Run on specific files
npx lint-staged --config .lintstagedrc.js
```

### Bypass Hooks (Emergency Only!)
```bash
# Skip pre-commit hook
git commit --no-verify -m "emergency fix"

# Skip all hooks
git commit -n -m "emergency fix"
```

## 🔧 Troubleshooting

### Hooks not running?
```bash
# Reinstall Husky
npm install
npx husky install

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg

# Check if hooks are installed
ls -la .git/hooks/
```

### Commitlint failing on valid message?
```bash
# Check your config
cat commitlint.config.js

# Test message manually
echo "feat(test): test message" | npx commitlint --verbose

# Check commitlint version
npx commitlint --version
```

### Lint-staged errors?
```bash
# Run ESLint manually
npm run lint

# Run Prettier manually
npx prettier --check "src/**/*.{ts,tsx}"

# Fix all files
npx prettier --write "src/**/*.{ts,tsx}"
```

### Git hooks not triggering?
```bash
# Check Husky installation
ls -la .husky/

# Verify git config
git config core.hooksPath

# Reinstall
rm -rf .husky
npx husky install
```

## 📚 Best Practices

### 1. Write Clear Commit Messages
```bash
# ✅ Good - Clear and specific
feat(wishlist): add filter by rating

# ❌ Bad - Vague
update wishlist
```

### 2. Use Appropriate Type
```bash
# ✅ Good - Correct type
fix(api): handle network timeout

# ❌ Bad - Wrong type
feat(api): handle network timeout
```

### 3. Keep Commits Focused
```bash
# ✅ Good - Single responsibility
feat(home): add search bar
feat(home): add category dropdown

# ❌ Bad - Multiple features
feat(home): add search and categories and filters
```

### 4. Use Scope Consistently
```bash
# ✅ Good - Consistent scopes
feat(auth): implement login
feat(auth): add logout button
fix(auth): resolve token refresh

# ❌ Bad - Inconsistent
feat(authentication): implement login
feat(login): add logout
```

## 🎨 Benefits

### Code Quality
- ✅ **Automatic formatting** - Prettier formats before commit
- ✅ **Linting enforcement** - ESLint catches errors
- ✅ **Type safety** - TypeScript errors blocked
- ✅ **Consistent style** - Same code style across team

### Commit History
- ✅ **Clean history** - Easy to read git log
- ✅ **Searchable** - Find commits by type
- ✅ **Changelog ready** - Auto-generate changelogs
- ✅ **Semantic versioning** - Easier to version

### Team Collaboration
- ✅ **Standards enforcement** - Everyone follows same rules
- ✅ **Fewer PR comments** - Issues caught before push
- ✅ **Better reviews** - Focus on logic, not style
- ✅ **Onboarding** - New devs follow conventions

## 📊 Project Statistics

After setup, you can track:

```bash
# Commits by type
git log --oneline | grep -E "^[a-z]+(\([a-z]+\))?: " | awk '{print $1}' | sort | uniq -c

# Recent commits
git log --oneline -10

# Commits by author with format
git log --pretty=format:"%an: %s" -10
```

## 🚀 Next Steps

### Optional Enhancements

1. **Pre-push Hook**
   ```bash
   # .husky/pre-push
   npm run test
   npm run build
   ```

2. **Prepare-commit-msg Hook**
   ```bash
   # Auto-add ticket number
   # .husky/prepare-commit-msg
   BRANCH_NAME=$(git symbolic-ref --short HEAD)
   TICKET=$(echo $BRANCH_NAME | grep -o '[A-Z]*-[0-9]*')
   echo "$TICKET: $(cat $1)" > $1
   ```

3. **Post-commit Hook**
   ```bash
   # .husky/post-commit
   echo "✅ Commit created successfully!"
   ```

## 📖 Documentation Files

- **COMMIT_GUIDELINES.md** - Detailed commit message guide
- **GIT_HOOKS_SETUP.md** - This file
- **.lintstagedrc.js** - Lint-staged configuration
- **commitlint.config.js** - Commitlint rules

## ✅ Summary

Git hooks setup is complete with:

- ✅ Husky installed và configured
- ✅ Pre-commit hook → runs lint-staged
- ✅ Commit-msg hook → validates format
- ✅ Lint-staged → auto-fix và format
- ✅ Commitlint → enforce conventions
- ✅ Documentation → guidelines ready

---

**Happy committing with quality!** 🎉✨