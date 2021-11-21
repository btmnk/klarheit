import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import classNames from 'classnames';

import { SelectOptions } from './SelectOptions/SelectOptions';
import { BaseInput } from '@klarheit/baseinput';

import styles from './Select.css';

export interface OptionGroupDict {
  [group: string]: SelectOption[];
}

export type SelectOptionValue = string | undefined | null;

export interface SelectOption {
  label: string | JSX.Element;
  value: SelectOptionValue;
  selected?: boolean;
  group?: string;
  alias?: string;
}

export interface SelectProps {
  options: SelectOption[];
  onChange: (options: SelectOption[]) => void;
  onBlur?: () => void;
  multiple?: boolean;
  searchable?: boolean;
  label?: string;
  labelIcon?: JSX.Element;
  grid?: boolean;
  error?: string;
  icon?: JSX.Element;
  className?: string;
}

const Select: React.FC<SelectProps> = (props) => {
  const { options, multiple, label, labelIcon, searchable, grid, error, icon, className, onChange, onBlur } = props;
  const selectedOptions = options.filter((option) => option.selected);

  const [isOpen, setIsOpen] = useState(false);

  const [searchText, setSearchText] = useState('');
  const availableOptions =
    multiple || searchable ? options.filter(filterByValueOrLabelAndNotSelected(searchText)) : options;

  const availableOptionsByGroup: OptionGroupDict = availableOptions.reduce((collection, current) => {
    if (!collection['default']) collection['default'] = [];
    if (current.group) {
      if (!collection[current.group]) collection[current.group] = [];
      collection[current.group]?.push(current);
    } else {
      collection['default'].push(current);
    }
    return collection;
  }, {} as OptionGroupDict);

  const optionsContainerRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const select = (value: SelectOptionValue) => {
    const newOptions = options.map((option) => ({
      ...option,
      selected: option.value === value ? true : multiple ? option.selected : false,
    }));

    onChange(newOptions);
    if (!multiple) {
      setSearchText('');
    }
    setIsOpen(false);
  };

  const handleDeselectClick = (value: string | undefined | null) => (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newOptions = options.map((option) => ({
      ...option,
      selected: option.value === value ? false : option.selected,
    }));

    onChange(newOptions);
    if (onBlur) onBlur();
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
    setSearchText('');
    setIsOpen(false);
  };

  const containerClassNames = classNames(styles.container, className);

  return (
    <div className={containerClassNames}>
      <BaseInput
        label={label}
        labelIcon={labelIcon}
        additionalRefs={[optionsContainerRef]}
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={error}
        isFilled={selectedOptions.length > 0}
        icon={icon}
        rotateIconOnFocus={true}
        showPopover={isOpen}
        popoverContent={
          <SelectOptions
            optionsByGroup={availableOptionsByGroup}
            onSelect={select}
            empty={availableOptions.length === 0}
            grid={grid || false}
          />
        }
      >
        {!multiple && selectedOptions[0] && <div className={styles.selected}>{selectedOptions[0].label}</div>}

        {multiple && (
          <div className={styles.tags}>
            {selectedOptions.map((option) => (
              <div key={option.value} className={styles.tag}>
                <span className={styles.label}>{option.label}</span>
                <span className={styles.deselect} onClick={handleDeselectClick(option.value)}>
                  X
                </span>
              </div>
            ))}
          </div>
        )}

        {(multiple || searchable) && <input value={searchText} onChange={handleSearchChange} />}
      </BaseInput>
    </div>
  );
};

const filterByValueOrLabelAndNotSelected =
  (needle: string) =>
  (target: SelectOption): boolean => {
    if (target.selected) return false;

    if (target.alias) {
      return target.alias.includes(needle);
    } else if (typeof target.label === 'string') {
      return target.label.includes(needle);
    } else if (target.value) {
      return target.value.includes(needle);
    }

    return false;
  };

export { Select };