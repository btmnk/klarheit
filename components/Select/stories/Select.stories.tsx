import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select, SelectOption } from '../src/Select';

export default {
  title: 'Forms/Select',
  component: Select,
  argTypes: {
    children: { control: false },
    onChange: { control: false },
    labelIcon: { control: false },
    icon: { control: false },
    className: { control: false },
    options: { control: false },
  },
} as ComponentMeta<typeof Select>;

const defaultOptions: SelectOption[] = [
  { label: 'Option One', value: 'one' },
  { label: 'Option Two', value: 'two' },
  { label: 'Option Three', value: 'three' },
  { label: 'Option Four', value: 'four' },
  { label: 'Option Five', value: 'five' },
  { label: 'Option Six', value: 'six' },
  { label: 'Option Seven', value: 'seven' },
  { label: 'Option Eight', value: 'eight' },
  { label: 'Option Nine', value: 'nine' },
];

const Template: ComponentStory<typeof Select> = (args) => {
  const [options, setOptions] = useState(defaultOptions);
  return <Select {...args} options={options} onChange={setOptions} />;
};

export const Default: ComponentStory<typeof Select> = Template.bind({});
Default.args = {};
