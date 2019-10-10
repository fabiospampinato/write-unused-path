
/* IMPORT */

import getUnusedPath from 'get-unused-path';
import {Options, Result} from 'get-unused-path/dist/types';
import tryloop from 'tryloop';
import * as writeFileAtomic from 'write-file-atomic';

/* WRITE UNUSED PATH */

function writeUnusedPath ( content: string | Buffer, options: Options ): Promise<Result> {

  return new Promise ( ( resolve, reject ) => {

    getUnusedPath ( options ).then ( result => {

      function write () {
        return new Promise ( resolve => {
          writeFileAtomic ( result.filePath, content, err => {
            if ( err ) return resolve ();
            resolve ( true );
          });
        });
      }

      function end ( success?: boolean ) {
        result.dispose ();
        if ( success === true ) return resolve ( result );
        reject ( new Error ( 'Couldn\'t write atomically to unused path' ) );
      }

      const loop = tryloop.exponential ({
        timeout: 1500,
        tries: 20,
        factor: 2,
        minInterval: 1,
        maxInterval: 1000,
        fn: write
      });

      loop.start ().then ( end ).catch ( end );

    }).catch ( reject );

  });

}

/* EXPORT */

export default writeUnusedPath;
