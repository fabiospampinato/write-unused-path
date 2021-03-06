
/* IMPORT */

import getUnusedPath from 'get-unused-path';
import {Result} from 'get-unused-path/dist/types';
import tryloop from 'tryloop';
import {ExponentialOptions} from 'tryloop/dist/types';
import {fromCallback as universalify} from 'universalify';
import {Options} from './types';

/* WRITE UNUSED PATH */

function writeUnusedPath ( content: string | Buffer, options: Options, tryloopOptions?: Partial<Omit<ExponentialOptions, 'fn'>> ): Promise<Result> {

  return new Promise ( ( resolve, reject ) => {

    getUnusedPath ( options ).then ( result => {

      function write () {
        return new Promise ( resolve => {
          const ensureDir = universalify ( require ( 'fs-extra/lib/mkdirs/mkdirs' ) );
          ensureDir ( result.folderPath ).then ( () => {
            const writeFileAtomic = require ( 'write-file-atomic' );
            writeFileAtomic ( result.filePath, content, err => {
              if ( err ) return resolve ();
              resolve ( true );
            });
          }).catch ( () => resolve () );
        });
      }

      function end ( success?: boolean ) {
        if ( options.autoDispose !== false ) result.dispose ();
        if ( success === true ) return resolve ( result );
        reject ( new Error ( 'Couldn\'t write atomically to unused path' ) );
      }

      const exponentialOptions = Object.assign ({
        timeout: 3000,
        tries: 20,
        factor: 2,
        minInterval: 1,
        maxInterval: 1000,
        fn: write
      }, tryloopOptions );

      const loop = tryloop.exponential ( exponentialOptions );

      loop.start ().then ( end ).catch ( end );

    }).catch ( reject );

  });

}

writeUnusedPath.blacklist = getUnusedPath.blacklist;

/* EXPORT */

export default writeUnusedPath;
