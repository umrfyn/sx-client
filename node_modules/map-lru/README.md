# MapLRU

> "Least Recently Used" (LRU) cache compatible to ES6 Map

[![NPM version](https://badge.fury.io/js/map-lru.svg)](https://www.npmjs.com/package/map-lru/)
[![Build Status](https://app.travis-ci.com/commenthol/map-lru.svg?branch=master)](https://app.travis-ci.com/commenthol/map-lru)
[![Coverage Status](https://coveralls.io/repos/github/commenthol/map-lru/badge.svg?branch=master)](https://coveralls.io/github/commenthol/map-lru?branch=master)

Useful for caching with limited memory usage.
API compatible with built-in [Map][] object.

## Install

```
$ npm install map-lru
```

## Usage

```js
import MapLRU from 'map-lru' // ES5
// const MapLRU = require('map-lru') // commonJs
const cache = new MapLRU(10)

cache.set('♥', '♥♥♥')

cache.has('♥');
//=> true
cache.get('♥');
//=> '♥♥♥'
cache.last
//=> '♥'
cache.size
//=> 1
```


## API

### new MapLRU(maxSize)

Creates a new instance

**Parameters**

- `maxSize` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** max. size of the LRU cache.

----

_Additional methods_

- `last`

  Returns the last accessed key.

  Returns **Any**

- `peek(key)`

  Get an item without marking it as recently used.

  **Parameters**

  - `key` **Any**

- `keysAccessed()`

  keys in order of access - last one is most recently used one.

  Returns **Iterator** Iterator object

----

_Default [Map][] methods_

- [`size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size)

- [`get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get)

- [`set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set)

- [`has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has)

- [`delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete)

- [`clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear)

- [`keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)

- [`values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values)

- [`entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)

- [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach)

- [`[Symbol.iterator]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator)

## License

[Unlicense](https://unlicense.org)

[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
