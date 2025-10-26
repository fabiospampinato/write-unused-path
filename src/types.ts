
/* IMPORT */

import type {WriteOptions} from 'atomically';
import type {Options as BaseOptions, Result} from 'get-unused-path';

/* MAIN */

type Options = BaseOptions & {
  writeOptions?: WriteOptions // Options to be passed to "atomically"
};

/* EXPORT */

export type {Options, Result};
