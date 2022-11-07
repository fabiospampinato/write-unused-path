
/* IMPORT */

import type {WriteOptions} from 'atomically/dist/types';
import type {Options as BaseOptions, Result} from 'get-unused-path/dist/types';

/* MAIN */

type Options = BaseOptions & {
  autoDispose?: boolean, // Automatically dispose once the operation is completed, enabled by default
  writeOptions?: WriteOptions // Options to be passed to "atomically"
};

/* EXPORT */

export type {Options, Result};
