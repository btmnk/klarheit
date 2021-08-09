const preset = require('postcss-preset-env');
module.exports = () => ({
  plugins: [preset({ stage: 0 })],
});
