import classNames from 'classnames';
import * as React from 'react';

import { useOutsideClick } from '@klarheit/use-outside-click';
import { Popover } from '@klarheit/popover';

import styles from './InputLayout.css';

export interface RenderPopoverContext {
  style: React.CSSProperties;
}

export interface InputLayoutProps {
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

const InputLayout: React.FC<InputLayoutProps> = (props) => {
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
    showPopover = false,
    hoverCursor = 'pointer',
    dynamicSize = false,
    className,
    onBlur,
    onFocus,
    children,
  } = props;

  const [isFocused, setIsFocused] = React.useState(autoFocus);

  const containerRef = React.useRef<HTMLLabelElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

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

      {popoverContent && (
        <Popover isOpen={showPopover} anchorRef={containerRef}>
          {popoverContent}
        </Popover>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export { InputLayout };
