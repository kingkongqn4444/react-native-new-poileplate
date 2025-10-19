/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// Check if Storybook is enabled
// const STORYBOOK_ENABLED = __DEV__ && Boolean(process.env.STORYBOOK_ENABLED);

let AppEntryPoint;

// if (STORYBOOK_ENABLED) {
  // Load Storybook
  // AppEntryPoint = require('./storybook').default;
// } else {
  // Load main app
  AppEntryPoint = require('./App').default;
// }

AppRegistry.registerComponent(appName, () => AppEntryPoint);
