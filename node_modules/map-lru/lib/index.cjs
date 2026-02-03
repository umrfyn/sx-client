'use strict';

class MapLRU {
  /**
   * @constructor
   * @param {Number} maxSize - max. size of the LRU cache
   */
  constructor (maxSize) {
    if (typeof maxSize !== 'number') {
      throw TypeError('maxSize needs to be a number')
    }

    this.maxSize = maxSize;
    this._keys = new Array(maxSize);
    this._next = new Float64Array(maxSize);
    this._prev = new Float64Array(maxSize);
    this._lastKey = undefined;
    this._size = 0;
    this._head = 0;
    this._tail = 0;
    this._pointers = new Map();
    this._map = new Map();
  }

  _move (pointer) {
    const oldHead = this._head;

    if (oldHead === pointer) {
      return
    }

    const prev = this._prev[pointer];
    const next = this._next[pointer];

    if (this._tail === pointer) {
      this._tail = prev;
    } else {
      this._prev[next] = prev;
    }

    this._prev[oldHead] = pointer;
    this._head = pointer;
    this._next[prev] = next;
    this._next[pointer] = oldHead;
  }

  /**
   * returns the number of elements in this map
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
   */
  get size () {
    return this._size
  }

  /**
   * returns the last accessed key
   * @return {any}
   */
  get last () {
    return this._lastKey
  }

  /**
   * returns a specified element from this map
   * @param {any} key
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
   */
  get (key) {
    const pointer = this._pointers.get(key);

    if (typeof pointer === 'undefined') return

    this._move(pointer);
    this._lastKey = key;
    return this._map.get(key)
  }

  /**
   * Get an item without marking it as recently used
   * @param {any} key
   */
  peek (key) {
    const pointer = this._pointers.get(key);

    if (typeof pointer === 'undefined') return

    this._lastKey = key;
    return this._map.get(key)
  }

  /**
   * adds or updates an entry in this map with a specified key and a value
   * @param {any} key The key of the element to add to the Map object
   * @param {any} value The value of the element to add to the Map object
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
   */
  set (key, value) {
    let pointer = this._pointers.get(key);
    this._lastKey = key;

    if (typeof pointer !== 'undefined') {
      this._move(pointer);
      this._map.set(key, value);
      return this
    } else if (this._size < this.maxSize) {
      pointer = this._size++;
    } else {
      pointer = this._tail;
      this._tail = this._prev[pointer];
      this._pointers.delete(this._keys[pointer]);
    }

    this._pointers.set(key, pointer);
    this._keys[pointer] = key;
    this._map.set(key, value);

    this._next[pointer] = this._head;
    this._prev[this._head] = pointer;
    this._head = pointer;

    return this
  }

  /**
   * removes all elements from this map
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
   */
  clear () {
    this._size = 0;
    this._head = 0;
    this._tail = 0;
    this._pointers = new Map();
    this._map = new Map();
  }

  /**
   * removes the specified element from this map by key
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
   */
  delete (key) {
    const pointer = this._pointers.get(key);

    if (typeof pointer === 'undefined') {
      return false
    }

    const next = this._next[pointer];
    const prev = this._prev[pointer];
    this._next[prev] = next;
    this._prev[next] = prev;
    this._pointers.delete(key);
    this._map.delete(key);
    this._size -= 1;

    return true
  }

  /**
   * returns a boolean indicating whether an element with the specified key exists in this map or not
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
   */
  has (key) {
    return this._pointers.has(key)
  }

  /**
   * returns a new map iterator object that contains the keys for each element in this map in insertion order
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
   */
  keys () {
    return this._pointers.keys()
  }

  /**
   * keys in order of access - last one is most recently used one
   * @return {IterableIterator<any>} Iterator object
   */
  * keysAccessed () {
    if (this._size) {
      let pointer = this._tail;
      yield this._keys[pointer];
      while (pointer !== this._head) {
        pointer = this._prev[pointer];
        yield this._keys[pointer];
      }
    }
  }

  /**
   * returns a new map iterator object that contains the values for each element in this map in insertion order
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values
   */
  values () {
    return this._map.values()
  }

  /**
   * returns a new map iterator object that contains the [key, value] pairs for each element in this map in insertion order
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
   */
  entries () {
    return this._map.entries()
  }

  /**
   * executes a provided function once per each key/value pair in this map, in insertion order
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
   */
  get forEach () {
    const map = this._map;
    return map.forEach.bind(map)
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator
   */
  [Symbol.iterator] () {
    return this._map[Symbol.iterator]()
  }
}

module.exports = MapLRU;
