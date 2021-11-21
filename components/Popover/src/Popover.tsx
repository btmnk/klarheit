import React, { forwardRef, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from './Popover.css';

const popoverRoot = document.getElementById('popover-root');
const ANCHOR_UPDATE_INTERVAL = 5;

interface ElementPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PopoverProps {
  anchorRef: RefObject<HTMLElement>;
  onMove?: () => void;
}

const Popover = forwardRef<HTMLDivElement, React.PropsWithChildren<PopoverProps>>((props, ref) => {
  const { anchorRef, onMove, children } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  const [anchorPosition, setAnchorPosition] = useState<ElementPosition | undefined>(undefined);

  const animationRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const update = () => {
      const currentRect = anchorRef.current?.getBoundingClientRect();
      if (!currentRect) return;

      setAnchorPosition((state) => {
        const sameLeft = state && currentRect.left === state.left;
        const sameTop = state && currentRect.top === state.top;
        const sameHeight = state && currentRect.height === state.height;
        const sameWidth = state && currentRect.width === state.width;

        if (sameLeft && sameTop && sameHeight && sameWidth) {
          return state;
        } else {
          if (state && onMove) {
            onMove();
          }

          const left = currentRect.left;
          const top = currentRect.top;
          const width = currentRect.width;
          const height = currentRect.height;

          return { left, top, width, height };
        }
      });
    };

    intervalRef.current = setInterval(() => {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(update);
    }, ANCHOR_UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onMove]);

  const [contentTop, setContentTop] = useState<number | string | undefined>(undefined);
  useLayoutEffect(() => {
    const contentRect = contentRef.current?.getBoundingClientRect();
    if (!contentRect || !anchorPosition) return;

    const bottomSpace = window.innerHeight - anchorPosition.top + anchorPosition.height;
    const topSpace = anchorPosition.top;

    const openToTheTop = topSpace > bottomSpace;

    if (openToTheTop) {
      setContentTop((contentRect.height + 6) * -1);
    } else {
      setContentTop('calc(100% + 6px)');
    }
  }, [anchorPosition]);

  if (!popoverRoot) return null;
  return ReactDOM.createPortal(
    <div className={styles.container} style={anchorPosition} ref={ref}>
      <div className={styles.content} style={{ top: contentTop }} ref={contentRef}>
        {children}
      </div>
    </div>,
    popoverRoot,
  );
});

Popover.displayName = 'Popover';
export { Popover };
