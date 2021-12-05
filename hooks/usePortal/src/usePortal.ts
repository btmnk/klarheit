import * as React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';

export type PortalRenderer = (content: JSX.Element) => React.ReactPortal | null;

export const usePortal = (customId?: string): PortalRenderer => {
  const id = React.useRef(customId ?? uuid()).current;

  const [portalRoot, setPortalRoot] = React.useState(document.getElementById(id));

  React.useEffect(() => {
    if (!portalRoot) {
      const rootElement = document.createElement('div');
      rootElement.id = id;
      document.body.append(rootElement);

      setPortalRoot(rootElement);
    }

    return () => {
      const targetRootElement = document.getElementById(id);
      if (targetRootElement) {
        targetRootElement.remove();
        setPortalRoot(null);
      }
    };
  }, []);

  const renderPortal = React.useCallback(
    (content: JSX.Element) => {
      if (!portalRoot) {
        return null;
      }

      return ReactDOM.createPortal(content, portalRoot);
    },
    [portalRoot],
  );

  return renderPortal;
};
