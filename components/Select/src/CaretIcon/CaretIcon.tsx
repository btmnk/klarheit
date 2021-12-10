import React from 'react';

export interface CaretIconProps {
  style?: React.CSSProperties;
}

const CaretIcon: React.FC<CaretIconProps> = (props) => {
  return (
    <div>
      <span>Hello world!</span>
    </div>
  );
};

export { CaretIcon };
