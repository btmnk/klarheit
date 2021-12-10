import * as React from 'react';
import cn from 'classnames';

import styles from './Toggle.css';

export interface ToggleProps {
  /**
   * The toggle label which is rendered on the right side next to the toggle
   */
  label?: string;

  /**
   * The label when the toggle value is false
   */
  disabledLabel?: string;

  /**
   * Optional html name attribute
   */
  name?: string;

  /**
   * The toggle value. Use this when you intend to handle the toggle state yourself.
   */
  value?: boolean;

  /**
   * The initial default value. Use this when you intend to let the component handle the toggle state itself.
   */
  defaultValue?: boolean;

  /**
   * An optional icon element that is rendered inside the toggle knob
   */
  icon?: JSX.Element;

  /**
   * Called when the toggle state changes
   */
  onChange?: (value: boolean) => void;

  /**
   * A refobject for the input element
   */
  inputRef?: React.RefObject<HTMLInputElement> | ((instance: HTMLInputElement | null) => void);
}

const Toggle: React.FC<ToggleProps> = (props) => {
  const { value, defaultValue, name, label, disabledLabel = label, icon, onChange, inputRef } = props;

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
        <div className={styles.toggleBobble}>{icon}</div>
      </div>
      <div className={styles.label}>{isActive ? label : disabledLabel}</div>
    </label>
  );
};

export { Toggle };
