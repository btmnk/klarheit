import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextField } from '../src/Textfield';

export default {
  title: 'Forms/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const Default: ComponentStory<typeof TextField> = Template.bind({});
Default.args = {};
