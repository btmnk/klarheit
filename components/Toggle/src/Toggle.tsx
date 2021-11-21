import * as React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import styles from './Toggle.css';

library.add(faCheck, faTimes);

export interface ToggleProps {
  label: string;
  name?: string;
  value?: boolean;
  defaultValue?: boolean;
  disabledLabel?: string;
  onChange?: (value: boolean) => void;
  inputRef?: (instance: HTMLInputElement | null) => void;
}

const Toggle: React.FC<ToggleProps> = (props) => {
  const { value, defaultValue, name, label, disabledLabel = label, onChange, inputRef } = props;

  const [isActive, setIsActive] = React.useState(value || defaultValue);
  React.useEffect(() => {
    setIsActive(value || (value === undefined && defaultValue));
  }, [value, defaultValue]);

  const handleChange = () => {
    setIsActive((state) => {
      if (onChange) onChange(!state);
      return !state;
    });
  };

  const cnContainer = cn(styles.container, isActive && styles.active);
  return (
    <label className={cnContainer}>
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultValue}
        checked={isActive || false}
        onChange={handleChange}
        ref={inputRef}
      />

      <div className={styles.toggle}>
        <div className={styles.toggleBobble}>
          <FontAwesomeIcon icon={isActive ? 'check' : 'times'} />
        </div>
      </div>
      <div className={styles.label}>{isActive ? label : disabledLabel}</div>
    </label>
  );
};

export { Toggle };
