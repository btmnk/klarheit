import React, { RefObject, useEffect, useRef, useState } from 'react';

export const useDragHandler = (scrollbarRef: RefObject<HTMLDivElement>, contentRef: RefObject<HTMLDivElement>) => {
  const initialPositionRef = useRef(0);
  const scrollTopRef = useRef(0);

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      setDragging(true);
      initialPositionRef.current = event.clientY;
      scrollTopRef.current = contentRef.current?.scrollTop ?? 0;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (dragging && contentRef.current && scrollbarRef.current) {
        const deltaY = event.clientY - initialPositionRef.current;

        const scrollbarThumb = scrollbarRef.current.firstChild as HTMLDivElement;
        const scrollbarTrackArea =
          scrollbarRef.current.getBoundingClientRect().height - scrollbarThumb.getBoundingClientRect().height;
        const deltaRatio = deltaY / scrollbarTrackArea;

        const contentRect = contentRef.current.getBoundingClientRect();
        const childRect = (contentRef.current.firstChild as HTMLElement).getBoundingClientRect();
        const movableArea = childRect.height - contentRect.height;

        contentRef.current.scrollTop = scrollTopRef.current + movableArea * deltaRatio;
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    if (scrollbarRef.current) {
      const scrollbarThumb = scrollbarRef.current.firstChild as HTMLDivElement;

      scrollbarThumb.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (scrollbarRef.current) {
        const scrollbarThumb = scrollbarRef.current.firstChild as HTMLDivElement;
        scrollbarThumb.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };
  });
};
