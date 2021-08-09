import { create } from '@storybook/theming';

export default create({
  base: 'dark',

  colorPrimary: 'hotpink',
  colorSecondary: '#284879',

  // UI
  appBg: '#171a21',
  appContentBg: '#22262e',
  appBorderColor: 'transparent',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#a8b1c4',
  textInverseColor: '#a8b1c4',

  // Toolbar default and active colors
  barTextColor: '#a8b1c4',
  barSelectedColor: '#bcddff',
  barBg: '#2a2f3a',

  // Form colors
  inputBg: '#171a21',
  inputBorder: '#284879',
  inputTextColor: '#a8b1c4',
  // inputBorderRadius: 4,

  brandTitle: '@klarheit/storybook',
  brandUrl: 'https://github.com/btmnk/klarheit',
  // brandImage: 'https://place-hold.it/350x150',
});
