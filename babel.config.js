module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blocklist: null,
      allowlist: null,
      safe: false,
      allowUndefined: true,
    }],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@stores': './src/stores',
          '@theme': './src/theme',
          '@types': './src/types',
          '@config': './src/config',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
        },
      },
    ],
  ],
};
