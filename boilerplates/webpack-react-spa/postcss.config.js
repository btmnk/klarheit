/* eslint-disable @typescript-eslint/no-var-requires */
const postcssPresetEnv = require('postcss-preset-env');

const config = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
      importFrom: './src/ui/Theme.css',
    }),
  ],
});

module.exports = config;
