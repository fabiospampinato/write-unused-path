
/* IMPORT */

import type {WriteOptions} from 'atomically';
import type {Options as BaseOptions, Result} from 'get-unused-path';

/* MAIN */

type Options = BaseOptions & {
  autoDispose?: boolean, // Automatically dispose once the operation is completed, enabled by default
  writeOptions?: WriteOptions // Options to be passed to "atomically"
};

/* EXPORT */

export type {Options, Result};
