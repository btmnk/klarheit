import React, { useLayoutEffect, useState } from 'react';
import { HorizontalOrientation } from '../interface/HorizontalOrientation';
import { VerticalOrientation } from '../interface/VerticalOrientation';

export interface UsePopoverPositionOptions {
  verticalOrientation: VerticalOrientation;
  horizontalOrientation: HorizontalOrientation;
  anchorRef: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}

export interface UsePopoverPositionResult {
  left: number;
  top: number;
}

export const usePopoverPosition = (options: UsePopoverPositionOptions, isOpen: boolean): UsePopoverPositionResult => {
  const { verticalOrientation, horizontalOrientation, anchorRef, contentRef } = options;

  const [result, setResult] = useState<UsePopoverPositionResult>({ left: 0, top: 0 });

  useLayoutEffect(() => {
    const anchorRect = anchorRef.current?.getBoundingClientRect();
    const contentRect = contentRef.current?.getBoundingClientRect();

    if (anchorRect && contentRect) {
      const top = calculateTopPosition(verticalOrientation, anchorRect, contentRect);
      const left = calculateLeftPosition(horizontalOrientation, anchorRect, contentRect);
      setResult({ left, top });
    }
  }, [isOpen, verticalOrientation, horizontalOrientation]);

  return result;
};

function calculateTopPosition(
  verticalOrientation: VerticalOrientation,
  anchorRect: DOMRect,
  contentRect: DOMRect,
): number {
  const adjustedOrientation = getVerticalOrientation(verticalOrientation, anchorRect, contentRect);

  switch (adjustedOrientation) {
    case VerticalOrientation.TOP:
      return anchorRect.top - contentRect.height + window.scrollY;
    case VerticalOrientation.CENTER:
      return anchorRect.bottom - anchorRect.height / 2 - contentRect.height / 2 + window.scrollY;
    case VerticalOrientation.BOTTOM:
      return anchorRect.bottom + window.scrollY;
    default:
      return 0;
  }
}

function calculateLeftPosition(
  horizontalOrientation: HorizontalOrientation,
  anchorRect: DOMRect,
  contentRect: DOMRect,
): number {
  switch (horizontalOrientation) {
    case HorizontalOrientation.LEFT:
      return anchorRect.left + window.scrollX;
    case HorizontalOrientation.CENTER:
      return anchorRect.left + anchorRect.width / 2 - contentRect.width / 2 + window.scrollX;
    case HorizontalOrientation.RIGHT:
      return anchorRect.right - contentRect.width + window.scrollX;
    default:
      return 0;
  }
}

function getVerticalOrientation(
  initialOrientation: VerticalOrientation,
  anchorRect: DOMRect,
  contentRect: DOMRect,
): VerticalOrientation {
  switch (initialOrientation) {
    case VerticalOrientation.BOTTOM:
      const spaceAtBottom = window.innerHeight - anchorRect.bottom;
      return spaceAtBottom < contentRect.height ? VerticalOrientation.TOP : initialOrientation;
    case VerticalOrientation.TOP:
      const spaceAtTop = anchorRect.top;
      return spaceAtTop < contentRect.height ? VerticalOrientation.BOTTOM : initialOrientation;
    default:
      return initialOrientation;
  }
}
