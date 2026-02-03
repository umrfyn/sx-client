# Poly1305 (JavaScript)

[![Build Status](https://github.com/paragonie/poly1305-js/actions/workflows/ci.yml/badge.svg)](https://github.com/paragonie/poly1305-js/actions)
[![npm version](https://img.shields.io/npm/v/poly1305-js.svg)](https://npm.im/poly1305-js)

This is a pure JavaScript implementation of Poly1305.
## Installing this Library

```
npm install poly1305-js
```

## Using this Library

Usage is straightforward.

```javascript
const Poly1305 = require('poly1305-js');

(async function() {
    let message = Buffer.from("test message");
    let key = Buffer.from('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f', 'hex');
    
    let tag = await Poly1305.onetimeauth(message, key);
    if (await Poly1305.onetimeauth_verify(message, key, tag)) {
        console.log('success');
    }

    // Streaming API
    let auth = new Poly1305(key);
    await auth.update(message);
    await auth.update(Buffer.from('some additional data'));
    tag = await auth.finish();
    console.log(tag);
})();
```
