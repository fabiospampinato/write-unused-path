
/* IMPORT */

import {describe} from 'ava-spec';
import * as fs from 'fs';
import * as path from 'path';
import {default as writeUnusedPath} from '../dist';

/* WRITE UNUSED PATH */

describe ( 'writeUnusedPath', it => {

  it ( 'works', async t => {

    const filePath = path.join ( process.cwd (), 'foo.txt' ),
          content = 'test';

    for ( let i = 0; i < 3; i++ ) { // Ensuring unused path get disposed after use

      const result = await writeUnusedPath ( content, { fileName: 'foo.txt' } );

      t.is ( result.filePath, filePath );
      t.is ( fs.readFileSync ( filePath, { encoding: 'utf8' } ), content );

      fs.unlinkSync ( filePath );

    }

  });

});
