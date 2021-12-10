import React from 'react';

import { usePortal } from '../src/usePortal';

export default {
  title: 'Hooks/usePortal',
};

export const Default = () => {
  const renderPortal = usePortal();

  return (
    <div style={{ width: 350, border: '3px dashed rgba(255,255,255,0.2)', padding: '0 20px', overflow: 'hidden' }}>
      <p>This box has overflow set to "hidden".</p>
      {renderPortal(
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: 20, marginTop: 10 }}>
          This is rendered inside the dotted box with <strong>usePortal</strong>.
          <br />
          Checkout the dom markup to see how this is rendered.
          <br />
          <br />
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: 20, marginTop: 10 }}>
            This feature is useful to render modals, tooltips, dropdowns etc. without the zIndex and overflow headache.
          </div>
        </div>,
      )}
    </div>
  );
};
