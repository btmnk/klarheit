import classNames from 'classnames';
import * as React from 'react';
import { useDragHandler } from './hooks/useDragHandler';

import styles from './Scrollbar.css';

export interface ScrollbarProps {}

const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  const { children } = props;

  const contentRef = React.useRef<HTMLDivElement>(null);
  const scrollbarRef = React.useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = React.useState(false);

  const fadeOutRef = React.useRef<number>(0);
  const handleFadeIn = () => {
    if (!isVisible) {
      setIsVisible(true);
    }

    clearTimeout(fadeOutRef.current);
    fadeOutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 1600);
  };

  const handleScroll = () => {
    handleFadeIn();

    if (contentRef.current && scrollbarRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const childRect = (contentRef.current.firstChild as HTMLElement).getBoundingClientRect();
      const movableArea = childRect.height - contentRect.height;

      const scrollTop = contentRef.current.scrollTop;
      const scrollRatio = scrollTop / movableArea;

      const scrollbarElement = scrollbarRef.current;
      const scrollbarThumbElement = scrollbarElement.firstChild as HTMLDivElement;

      const scrollbarRect = scrollbarElement.getBoundingClientRect();
      const scrollbarThumbRect = scrollbarThumbElement.getBoundingClientRect();
      const scrollbarSpace = scrollbarRect.height - scrollbarThumbRect.height - 4;

      const scrollbarThumbOffset = scrollbarSpace * scrollRatio;

      scrollbarThumbElement.style.transform = `translateY(${scrollbarThumbOffset}px)`;
    }
  };

  React.useLayoutEffect(() => {
    if (contentRef.current && scrollbarRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const childRect = (contentRef.current.firstChild as HTMLElement).getBoundingClientRect();
      const contentChildRatio = contentRect.height / childRect.height;
      const scrollbarThumbElement = scrollbarRef.current.firstChild as HTMLDivElement;

      scrollbarThumbElement.style.height = `${contentChildRatio * 100}%`;
    }
  }, []);

  useDragHandler(scrollbarRef, contentRef);

  const containerClassNames = classNames(styles.container, isVisible && styles.visible);

  return (
    <div className={containerClassNames}>
      <div className={styles.content} ref={contentRef} onScroll={handleScroll}>
        {children}
      </div>
      <div className={styles.scrollbarTrack} ref={scrollbarRef}>
        <div className={styles.scrollbarThumb} />
      </div>
    </div>
  );
};

export { Scrollbar };
