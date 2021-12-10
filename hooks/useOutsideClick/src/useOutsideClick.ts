import { RefObject, useEffect } from 'react';

export const useOutsideClick = (targets: RefObject<Element> | RefObject<Element>[], handler: () => void): void => {
  const refs = Array.isArray(targets) ? targets : [targets];

  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      if (refs.some((ref) => ref.current && ref.current.contains(event.target as Node))) {
        return;
      }

      handler();
    }

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
};
