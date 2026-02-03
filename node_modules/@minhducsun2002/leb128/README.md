# `leb128`
###### A parser for LEB128-formatted numbers.
![](https://img.shields.io/github/workflow/status/minhducsun2002/leb128/Jest%20tests?label=Jest%20tests)
![](https://img.shields.io/github/workflow/status/minhducsun2002/leb128/TypeScript%20compilation)
[![](https://img.shields.io/npm/v/@minhducsun2002/leb128)](https://www.npmjs.com/package/@minhducsun2002/leb128)

### Usage
```js
// ES6 imports
import { LEB128 } from '@minhducsun2002/leb128';
// CommonJS thingy
const { LEB128 } = require('@minhducsun2002/leb128');

// Unsigned integers
var a = LEB128.encode(462644);
// Uint8Array (3) [ 180, 158, 28 ]
var b = LEB128.decode(a);
// 462644
var c = LEB128.decode([0xA6, 0x87, 0x90, 0x04])
// 8651686

// Signed (negative) integers
var d = LEB128.encode(-128383);
// Uint8Array(3) [ 129, 149, 120 ]
var e = LEB128.decode(d, 0, true); /* offset = 0, negative number */
// 8651686
var f = LEB128.decode([0x01, 0x81, 0x95, 0x78], 1, true)
// -128383
```

### License

MIT License. See [here](./LICENSE)

