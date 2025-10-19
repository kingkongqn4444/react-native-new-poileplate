/**
 * Lint-staged Configuration
 * Runs linters on git staged files
 */

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