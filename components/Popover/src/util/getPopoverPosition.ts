import { HorizontalOrientation } from '../interface/HorizontalOrientation';
import { VerticalOrientation } from '../interface/VerticalOrientation';

export interface PopoverPositionOptions {
  horizontalOrientation: HorizontalOrientation;
  verticalOrientation: VerticalOrientation;
}

export const getPopoverPosition = (anchorRect: DOMRect, options: PopoverPositionOptions) => {
  const { horizontalOrientation, verticalOrientation } = options;
};
