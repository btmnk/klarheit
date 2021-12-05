import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputLayout } from '../src/InputLayout';

export default {
  title: 'Forms/InputLayout',
  component: InputLayout,
} as ComponentMeta<typeof InputLayout>;

const Template: ComponentStory<typeof InputLayout> = (args) => <InputLayout {...args} />;

export const Default: ComponentStory<typeof InputLayout> = Template.bind({});
Default.args = {};
