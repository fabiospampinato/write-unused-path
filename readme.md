# Write Unused Path

Reliably write to an unused path.

It is basically a wrapper around [get-unused-path](https://github.com/fabiospampinato/get-unused-path) which doesn't just return an unused path, but also writes to it.

## Features

- It reliably retrieves an unused path via [get-unused-path](https://github.com/fabiospampinato/get-unused-path).
- It attempts to write to it, re-trying in case of failure.
- It writes files atomically.

## Install

```sh
npm install write-unused-path
```

## Usage

```ts
import fs from 'fs';
import writeUnusedPath from 'write-unused-path';

// Let's write a file to an unused path

const content = 'some content';

const result = await writeUnusedPath ( content, {
  fileName: 'foo.txt',
  folderPath: '/x/y/z',
  // incrementer: ( name, ext, attempt ) => attempt > 1 ? `${name}-${attempt}${ext}` : `${name}${ext}`,
  // maxTries: 1000,
  // writeOptions: {} // Write options from the "atomically" package
});

result.folderPath; // => '/x/y/z'
result.filePath; // => '/x/y/z/foo (3).txt'
result.fileName; // => 'foo (3).txt'

// Let's check that the file got actually written

console.log ( fs.readFileSync ( filePath, { encoding: 'utf8' } ) ); // => 'some content'
```

## Related

- [unused-path](https://github.com/fabiospampinato/unused-path): Reliably get an unused path and copy/move/write to it.
- [copy-unused-path](https://github.com/fabiospampinato/copy-unused-path): Reliably copy to an unused path.
- [get-unused-path](https://github.com/fabiospampinato/get-unused-path): Reliably get an unused path you can write to.
- [move-unused-path](https://github.com/fabiospampinato/move-unused-path): Reliably move to an unused path.

## License

MIT © Fabio Spampinato
