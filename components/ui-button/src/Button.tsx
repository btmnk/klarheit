import React from 'react';
import cn from 'classnames';

import styles from './Button.css';

export interface ButtonProps {
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  variant?: 'primary' | 'positive' | 'negative' | 'slim';
  align?: 'center';
  className?: string;
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
