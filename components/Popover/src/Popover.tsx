import * as React from 'react';
import classNames from 'classnames';

import { usePortal } from '@klarheit/use-portal';
import { useOutsideClick } from '@klarheit/use-outside-click';

import { useBodyLock } from './hooks/useBodyLock';

import styles from './Popover.css';
import { VerticalOrientation } from './interface/VerticalOrientation';
import { HorizontalOrientation } from './interface/HorizontalOrientation';
import { usePopoverPosition } from './hooks/usePopoverPosition';

export interface PopoverProps {
  /**
   * The popover target that should be used to position the popover content
   */
  anchorRef: React.RefObject<HTMLElement>;

  /**
   * Defines whether the popover content should be rendered or not
   */
  isOpen: boolean;

  /**
   * Defines the vertical orientation of the Popover content
   * @default VerticalOrientation.BOTTOM
   */
  verticalOrientation?: VerticalOrientation;

  /**
   * Defines the horizontal orientation of the Popover content
   * @default HorizontalOrientation.LEFT
   */
  horizontalOrientation?: HorizontalOrientation;

  /**
   * Is called when clicking outside of the popover or anchor element
   * Should be used to set the isOpen state to false
   */
  onOutsideClick?: () => void;

  /**
   * A classname override for the container element
   * The container element mimics the position of the anchor element so the content element can derive the positioning relatively
   */
  containerClassNames?: string;

  /**
   * A classname override for the content element
   * The content element contains the passed child content of the Popover component
   */
  contentClassNames?: string;

  /**
   * Style overrides for the popover container.
   * The `transform` property is always set by the Popover and cannot be overridden. You can try though 😀.
   */
  style?: React.CSSProperties;
}

/**
 * The Popover component is used to render content with a portal with a relative position to the provided anchorRef.
 * To prevent unexpected behaviour when opened the body will not be scrollable until the popover is closed again.
 *
 * This component is useful for rendering Modals, Tooltips, Dropdowns etc. since it utilizes React Portals to render the content
 * outside of the parents DOM element.
 *
 * Checkout https://reactjs.org/docs/portals.html \
 * Also be aware of https://reactjs.org/docs/portals.html#event-bubbling-through-portals
 */
const Popover = React.forwardRef<HTMLDivElement, React.PropsWithChildren<PopoverProps>>((props, ref) => {
  const {
    anchorRef,
    isOpen,
    verticalOrientation = VerticalOrientation.BOTTOM,
    horizontalOrientation = HorizontalOrientation.LEFT,
    onOutsideClick,
    children,
    style,
  } = props;

  const localRef = React.useRef<HTMLDivElement>(null);
  const contentRef = (ref as React.RefObject<HTMLDivElement>) || localRef;
  const renderPortal = usePortal();

  useBodyLock(isOpen);

  useOutsideClick([anchorRef, contentRef], () => {
    if (onOutsideClick) {
      onOutsideClick();
    }
  });

  const popoverPosition = usePopoverPosition(
    { anchorRef, contentRef, verticalOrientation, horizontalOrientation },
    isOpen,
  );

  const popoverStyle: React.CSSProperties = {
    transform: `translate(${popoverPosition.left}px, ${popoverPosition.top}px)`,
    ...style,
  };

  const containerClassNames = classNames(styles.container, isOpen && styles.open);

  return renderPortal(
    <div className={containerClassNames} style={popoverStyle} ref={contentRef}>
      {children}
    </div>,
  );
});

export { Popover };
