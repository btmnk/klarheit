const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');

const config = () => ({
  plugins: [
    postcssImport(),
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    }),
  ],
});

module.exports = config;
