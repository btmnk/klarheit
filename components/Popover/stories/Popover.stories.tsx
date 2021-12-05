import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Popover } from '../src/Popover';

export default {
  title: 'Layout/Popover',
  component: Popover,
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => {
  const anchorRef = React.useRef(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen((current) => !current);
  const close = () => setIsOpen(false);

  return (
    <div>
      <button ref={anchorRef} onClick={toggleOpen}>
        This is the anchor element. Click it to toggle the popover content.
      </button>
      <Popover {...args} isOpen={isOpen} anchorRef={anchorRef} onOutsideClick={close}>
        <div style={{ background: '#000000', border: '1px solid #333', padding: 15 }}>This is the popover content</div>
      </Popover>
    </div>
  );
};

export const Default: ComponentStory<typeof Popover> = Template.bind({});
Default.args = {};

const PaddedTemplate: ComponentStory<typeof Popover> = (args) => {
  const anchorRef = React.useRef(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen((current) => !current);
  const close = () => setIsOpen(false);

  return (
    <div>
      <div style={{ height: 400 }} />
      <button ref={anchorRef} onClick={toggleOpen}>
        This is the anchor element. Click it to toggle the popover content.
      </button>
      <Popover {...args} isOpen={isOpen} anchorRef={anchorRef} onOutsideClick={close}>
        <div style={{ background: '#000000', border: '1px solid #333', padding: 15 }}>This is the popover content</div>
      </Popover>
      <div style={{ height: 400 }} />
    </div>
  );
};

export const WithScroll: ComponentStory<typeof Popover> = PaddedTemplate.bind({});
WithScroll.args = {};
