import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../src/Button';

export default {
  title: 'Interactive/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Click me!</Button>;

export const Default: ComponentStory<typeof Button> = Template.bind({});
Default.args = {};

export const WithIcon: ComponentStory<typeof Button> = Template.bind({});
WithIcon.args = {
  icon: (
    <div
      style={{
        height: 18,
        width: 18,
        borderRadius: 18,
        border: '1px solid var(--fgColor)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
      }}
    >
      +
    </div>
  ),
};
