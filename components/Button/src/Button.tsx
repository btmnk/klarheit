import * as React from 'react';
import cn from 'classnames';

import styles from './Button.css';

export interface ButtonProps {
  /**
   * If set the button will use an anchor tag with this href attribute
   * If both href and onClick are set there will be an anchor tag with href and the onclick handler
   */
  href?: string;

  /**
   * If set the button will use an onclick handler with this callback
   * If both href and onClick are set there will be an anchor tag with href and the onclick handler
   */
  onClick?: () => void;

  /**
   * If true the button will take the full available space
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Renders the button with the accent colors
   * @default false
   */
  primary?: boolean;

  /**
   * Renders the button in different variants using different colors
   *
   * Positive: green accent colors indicating a positive confirmation action
   * Negative: red accent colors indicating a negative cancel or delete action
   *
   * @default default
   */
  variant?: 'default' | 'positive' | 'negative';

  /**
   * If true the content of the button will be centered
   * @default false
   */
  centered?: boolean;

  /**
   * If true the buttons functionality will be disabled with a fitting appearance
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional css module className to override the styles
   */
  className?: string;

  /**
   * Additional JSX.Element that is rendered next to the content
   */
  icon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    href,
    onClick,
    children,
    fullWidth,
    variant = 'default',
    centered,
    primary,
    disabled,
    icon,
    className,
  } = props;

  const cnButton = cn(
    className,
    styles.button,
    fullWidth && styles.fullWidth,
    centered && styles.center,
    primary && styles.primary,
    disabled && styles.disabled,
    variant === 'positive' && styles.green,
    variant === 'negative' && styles.red,
  );

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const content = (
    <>
      {icon && icon}
      {children && <div className={styles.buttonLabel}>{children}</div>}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} onClick={handleClick} className={cnButton}>
        {content}
      </a>
    );
  }

  return (
    <div onClick={handleClick} className={cnButton}>
      {content}
    </div>
  );
};

export { Button };
