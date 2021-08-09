module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../../components/**/stories/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules = config.module.rules.filter((rule) => {
      if (rule.test) {
        return !rule.test.toString().includes('css');
      }

      return true;
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: { mode: 'local', localIdentName: '[name]__[local]__[contenthash:base64:5]' },
          },
        },
        'postcss-loader',
      ],
      exclude: /node_modules/,
    });

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: /node_modules/,
    });

    return config;
  },
};
