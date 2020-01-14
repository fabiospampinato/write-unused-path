
/* IMPORT */

import * as fs from 'fs-extra';
import getUnusedPath from 'get-unused-path';
import {Options, Result} from 'get-unused-path/dist/types';
import tryloop from 'tryloop';
import {ExponentialOptions} from 'tryloop/dist/types';
import * as writeFileAtomic from 'write-file-atomic';

/* WRITE UNUSED PATH */

function writeUnusedPath ( content: string | Buffer, options: Options, tryloopOptions?: Partial<Omit<ExponentialOptions, 'fn'>> ): Promise<Result> {

  return new Promise ( ( resolve, reject ) => {

    getUnusedPath ( options ).then ( result => {

      function write () {
        return new Promise ( resolve => {
          fs.ensureDir ( result.folderPath ).then ( () => {
            writeFileAtomic ( result.filePath, content, err => {
              if ( err ) return resolve ();
              resolve ( true );
            });
          }).catch ( () => resolve () );
        });
      }

      function end ( success?: boolean ) {
        result.dispose ();
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

/* EXPORT */

export default writeUnusedPath;
