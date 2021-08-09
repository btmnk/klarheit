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
   * Renders the button in different variants using different colors and sizes
   */
  variant?: 'primary' | 'positive' | 'negative' | 'slim';

  /**
   * If set the content of the button will be centered
   */
  align?: 'center';

  /**
   * An addition css module className to override the styles
   */
  className?: string;

  /**
   * Additional JSX.Element that is rendered next to the content
   */
  icon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { href, onClick, children, fullWidth, variant = 'filled', align, icon, className } = props;

  const cnButton = cn(
    className,
    styles.button,
    fullWidth && styles.fullWidth,
    align === 'center' && styles.center,
    variant === 'primary' && styles.primary,
    variant === 'positive' && styles.green,
    variant === 'negative' && styles.red,
    variant === 'slim' && styles.slim,
  );

  const content = (
    <>
      {icon && icon}
      {children && <div className={styles.buttonLabel}>{children}</div>}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={cnButton}>
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className={cnButton}>
      {content}
    </div>
  );
};

export { Button };
