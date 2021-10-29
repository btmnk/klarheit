import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from "./LoadingIndicator.css";

export interface LoadingIndicatorProps {
  withDelay?: boolean;
  withIconBackground?: boolean;
  withOverlay?: boolean;
  small?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props) => {
  const { withIconBackground, withOverlay, small, withDelay = true } = props;

  const [showIndicator, setShowIndicator] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setShowIndicator(true);
    }, 650);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const cnContainer = classNames(
    styles.container,
    withIconBackground && styles.background,
    withOverlay && styles.overlay,
    small && styles.small
  );

  return !withDelay || showIndicator ? (
    <div className={cnContainer}>
      <div className={styles.square} />
      <div className={styles.square} />
      <div className={styles.square} />
    </div>
  ) : null;
};

export { LoadingIndicator };
