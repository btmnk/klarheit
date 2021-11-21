import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Toggle } from '../src/Toggle';

export default {
  title: 'Interactive/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Default: ComponentStory<typeof Toggle> = Template.bind({});
Default.args = {};
