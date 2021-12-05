import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select, SelectOption } from '../src/Select';

export default {
  title: 'Forms/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const defaultOptions: SelectOption[] = [
  { label: 'Option One', value: 'one' },
  { label: 'Option Two', value: 'two' },
  { label: 'Option Three', value: 'three' },
];

const Template: ComponentStory<typeof Select> = (args) => <Select options={defaultOptions} {...args} />;

export const Default: ComponentStory<typeof Select> = Template.bind({});
Default.args = {};
