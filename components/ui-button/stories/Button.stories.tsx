import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../src/Button';

export default {
  title: 'Interactive/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Click me!</Button>;

export const Primary: ComponentStory<typeof Button> = Template.bind({});
Primary.args = {};
