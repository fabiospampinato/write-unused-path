
/* IMPORT */

import {describe} from 'fava';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import writeUnusedPath from '../dist/index.js';

/* MAIN */

describe ( 'writeUnusedPath', it => {

  it ( 'works', async t => {

    const filePath = path.join ( process.cwd (), 'foo.txt' );
    const content = 'test';

    for ( let i = 0; i < 3; i++ ) { // Ensuring unused path get disposed after use

      const result = await writeUnusedPath ( content, { fileName: 'foo.txt' } );

      t.is ( result.filePath, filePath );
      t.is ( fs.readFileSync ( filePath, { encoding: 'utf8' } ), content );

      fs.unlinkSync ( filePath );

    }

  });

});
