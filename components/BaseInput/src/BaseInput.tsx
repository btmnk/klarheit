import classNames from 'classnames';
import React, { CSSProperties, useRef, useState } from 'react';

import { useOutsideClick } from '@klarheit/use-outside-click';
import { Popover } from '@klarheit/popover';

import styles from './BaseInput.css';

export interface RenderPopoverContext {
  style: CSSProperties;
}

export interface BaseInputProps {
  label?: string;
  labelIcon?: JSX.Element;
  icon?: JSX.Element;
  unit?: string;
  isFilled?: boolean;
  autoFocus?: boolean;
  additionalRefs?: Array<React.RefObject<HTMLElement>>;
  error?: string;
  rotateIconOnFocus?: boolean;
  popoverContent?: JSX.Element;
  hoverCursor?: 'pointer' | 'text';
  showPopover?: boolean;
  dynamicSize?: boolean;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const BaseInput: React.FC<BaseInputProps> = (props) => {
  const {
    label,
    labelIcon,
    icon,
    unit,
    isFilled,
    additionalRefs = [],
    autoFocus,
    error,
    rotateIconOnFocus,
    popoverContent,
    showPopover,
    hoverCursor = 'pointer',
    dynamicSize = false,
    className,
    onBlur,
    onFocus,
    children,
  } = props;

  const [isFocused, setIsFocused] = useState(autoFocus);

  const containerRef = useRef<HTMLLabelElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleBlur = () => {
    if (onBlur && isFocused) {
      onBlur();
    }

    setIsFocused(false);
  };

  useOutsideClick([containerRef, popoverRef, ...additionalRefs], handleBlur);

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }

    setIsFocused(true);
  };

  const containerClassNames = classNames(
    styles.container,
    isFocused && styles.focus,
    isFilled && styles.filled,
    rotateIconOnFocus && styles.rotateIcon,
    error && styles.hasError,
    dynamicSize && styles.dynamic,
    className,
  );

  return (
    <div className={containerClassNames}>
      <label onClick={handleFocus} style={{ cursor: hoverCursor }} ref={containerRef}>
        {label && (
          <div className={styles.label}>
            {labelIcon && <span>{labelIcon}</span>}
            <span>{label}</span>
          </div>
        )}
        <div className={styles.inputContainer}>
          <div className={styles.content}>{children}</div>
          {unit && <div className={styles.unit}>{unit}</div>}
          {icon && <div className={styles.icon}>{icon}</div>}
        </div>
      </label>

      {showPopover && popoverContent && (
        <Popover ref={popoverRef} anchorRef={containerRef}>
          {popoverContent}
        </Popover>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export { BaseInput };
