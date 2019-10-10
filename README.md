# Write Unused Path

Reliably write to an unused path.

It is basically a wrapper around [get-unused-path](https://github.com/fabiospampinato/get-unused-path) which doesn't just return an unused path, but also writes to it.

## Features

- It reliably retrieves an unused path via [get-unused-path](https://github.com/fabiospampinato/get-unused-path).
- It attempts to write to it, re-trying in case of failure.
- It writes files atomically.

## Install

```sh
npm install --save write-unused-path
```

## Usage

It accepts the same options object, and returns the same return value, as [get-unused-path](https://github.com/fabiospampinato/get-unused-path).

```ts
import * as fs from 'fs';
import writeUnusedPath from 'write-unused-path';

async function example () {

  const content = 'some content';

  const {folderPath, filePath, fileName} = await writeUnusedPath ( content, {
    folderPath: '/x/y/z',
    fileName: 'foo.txt',
    // maxTries: 1000,
    // incrementer: ( name, ext, attempt ) => attempt > 1 ? `${name}-${attempt}${ext}` : `${name}${ext}`
  });

  console.log ( folderPath ); // => '/x/y/z'
  console.log ( filePath ); // => '/x/y/z/foo (3).txt'
  console.log ( fileName ); // => 'foo (3).txt'

  console.log ( fs.readFileSync ( filePath, { encoding: 'utf8' } ) ); // => 'some content'

}

example ();
```

## Related

- [get-unused-path](https://github.com/fabiospampinato/get-unused-path): Reliably get an unused path you can write to.

## License

MIT © Fabio Spampinato
