
/* IMPORT */

import {writeFile} from 'atomically';
import getUnusedPath from 'get-unused-path';
import type {Options, Result} from './types';

/* MAIN */

const writeUnusedPath = async ( content: Uint8Array | string, options: Options ): Promise<Result> => {

  const result = await getUnusedPath ( options );

  try {

    await writeFile ( result.filePath, content, options.writeOptions );

    return result;

  } finally {

    if ( options.autoDispose !== false ) {

      result.dispose ();

    }

  }

};

/* EXPORT */

export default writeUnusedPath;
