/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const reactNativeSwipeActionListRoot = path.resolve(__dirname, '..');

module.exports = {
  // Since we keep the example app separate from our root project we need
  // to configure metro to include our lib in the JS bundle it builds.
  watchFolders: [reactNativeSwipeActionListRoot],
  resolver: {
    // Duplicate copies of react-native in the metro bundle stop the app from loading
    // so blacklist the root project's version from being processed by metro.
    blacklistRE: blacklist([
      new RegExp(
        `${reactNativeSwipeActionListRoot}/node_modules/react-native/.*`,
      ),
    ]),
    // Since we've blacklisted react-native from the root project, let metro resolve
    // react-native imports from the root project using our example's node_modules instead.
    extraNodeModules: {
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
