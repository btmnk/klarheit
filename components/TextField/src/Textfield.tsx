import * as React from 'react';

import { InputLayout } from '@klarheit/input-layout';

interface BaseTextFieldProps {
  label?: string;
  name?: string;
  unit?: string;
  error?: string;
  onBlur?: () => void;
  inputRef?: (instance: HTMLInputElement | null) => void;
}

type StringTextFieldProps = BaseTextFieldProps & {
  value?: string;
  defaultValue?: string;
  type?: 'text';
  onChange?: (value: string) => void;
};

type NumberTextFieldProps = BaseTextFieldProps & {
  value?: number;
  defaultValue?: number;
  type?: 'number';
  onChange?: (value: number) => void;
};

export type TextFieldProps = StringTextFieldProps | NumberTextFieldProps;

const TextField: React.FC<TextFieldProps> = (props) => {
  const { label, name, value, defaultValue, type = 'text', unit, error, onBlur, onChange, inputRef } = props;

  const [isFilled, setIsFilled] = React.useState(
    Boolean((value && value !== '') || (defaultValue && defaultValue !== '')),
  );
  React.useEffect(() => {
    if (!defaultValue) {
      setIsFilled(Boolean(value && value !== ''));
    }
  }, [value, defaultValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(event.target.value !== '');
    if (onChange) {
      const targetValue = type === 'text' ? event.target.value : Number(event.target.value);
      onChange(targetValue as never);
    }
  };

  return (
    <InputLayout label={label} isFilled={isFilled} error={error} unit={unit} hoverCursor={'text'}>
      <input
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onClick={focus}
        onBlur={onBlur}
        type={type}
        ref={inputRef}
      />
    </InputLayout>
  );
};

export { TextField };
