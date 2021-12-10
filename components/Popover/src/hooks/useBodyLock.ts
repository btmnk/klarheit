import { useEffect } from 'react';
import { getScrollbarWidth } from '../util/getScrollbarWidth';

let originalBodyOverflow: string | undefined = undefined;
let originalBodyPadding: string | undefined = undefined;

export const useBodyLock = (isOpen: boolean) => {
  if (!originalBodyOverflow) {
    originalBodyOverflow = document.body.style.overflow || 'auto';
  }

  if (!originalBodyPadding) {
    originalBodyPadding = document.body.style.paddingRight || '0px';
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${getScrollbarWidth()}px`;
    } else {
      document.body.style.overflow = originalBodyOverflow ?? 'auto';
      document.body.style.paddingRight = originalBodyPadding ?? '0px';
    }
  }, [isOpen]);
};
