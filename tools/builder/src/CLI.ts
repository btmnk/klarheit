import meow from 'meow';
import { HELP } from './Help';

export const CLI = meow(HELP, {
  importMeta: import.meta,
  flags: {
    file: {
      type: 'string',
      alias: 'f',
      isMultiple: false,
      default: 'src/index.ts',
    },
  },
});
