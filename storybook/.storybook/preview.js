import { Theme } from '@klarheit/theme-default';
import customTheme from './theme/customTheme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: ['Getting Started'],
  },
  docs: {
    theme: customTheme,
  },
};

export const decorators = [
  (Story) => (
    <>
      <Theme />
      <Story />
    </>
  ),
];
