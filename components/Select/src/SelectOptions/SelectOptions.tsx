import React from 'react';
import cn from 'classnames';

import { OptionGroupDict, SelectOptionValue } from '../Select';
import { Scrollbar } from '@klarheit/scrollbar';

import styles from './SelectOptions.css';

export interface SelectOptionsProps {
  optionsByGroup: OptionGroupDict;
  onSelect: (value: SelectOptionValue) => void;
  empty: boolean;
  grid: boolean;
}

const SelectOptions: React.FC<SelectOptionsProps> = (props) => {
  const { optionsByGroup, onSelect, empty, grid } = props;

  const optionGroupKeys = Object.keys(optionsByGroup);

  const containerClassNames = cn(styles.container, grid && styles.grid);

  return (
    <div className={containerClassNames}>
      <Scrollbar>
        {optionGroupKeys.map((group) => {
          const groupOptions = optionsByGroup[group];
          return (
            <div id={group} key={group} className={styles.optionGroup}>
              {groupOptions?.map((option) => {
                const handleClick = () => onSelect(option.value);

                return (
                  <div
                    key={option.value}
                    className={cn(styles.option, option.selected && styles.selectedOption)}
                    onClick={handleClick}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          );
        })}

        {empty && <div className={styles.noOptions}>No options</div>}
      </Scrollbar>
    </div>
  );
};

SelectOptions.displayName = 'SelectOptions';
export { SelectOptions };
