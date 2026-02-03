export default class MapLRU {
    /**
     * @constructor
     * @param {Number} maxSize - max. size of the LRU cache
     */
    constructor(maxSize: number);
    maxSize: number;
    _keys: any[];
    _next: Float64Array;
    _prev: Float64Array;
    _lastKey: any;
    _size: number;
    _head: number;
    _tail: number;
    _pointers: Map<any, any>;
    _map: Map<any, any>;
    _move(pointer: any): void;
    /**
     * returns the number of elements in this map
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
     */
    get size(): number;
    /**
     * returns the last accessed key
     * @return {any}
     */
    get last(): any;
    /**
     * returns a specified element from this map
     * @param {any} key
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
     */
    get(key: any): any;
    /**
     * Get an item without marking it as recently used
     * @param {any} key
     */
    peek(key: any): any;
    /**
     * adds or updates an entry in this map with a specified key and a value
     * @param {any} key The key of the element to add to the Map object
     * @param {any} value The value of the element to add to the Map object
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
     */
    set(key: any, value: any): this;
    /**
     * removes all elements from this map
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
     */
    clear(): void;
    /**
     * removes the specified element from this map by key
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
     */
    delete(key: any): boolean;
    /**
     * returns a boolean indicating whether an element with the specified key exists in this map or not
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
     */
    has(key: any): boolean;
    /**
     * returns a new map iterator object that contains the keys for each element in this map in insertion order
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
     */
    keys(): IterableIterator<any>;
    /**
     * keys in order of access - last one is most recently used one
     * @return {IterableIterator<any>} Iterator object
     */
    keysAccessed(): IterableIterator<any>;
    /**
     * returns a new map iterator object that contains the values for each element in this map in insertion order
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values
     */
    values(): IterableIterator<any>;
    /**
     * returns a new map iterator object that contains the [key, value] pairs for each element in this map in insertion order
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
     */
    entries(): IterableIterator<[any, any]>;
    /**
     * executes a provided function once per each key/value pair in this map, in insertion order
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
     */
    get forEach(): (callbackfn: (value: any, key: any, map: Map<any, any>) => void, thisArg?: any) => void;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator
     */
    [Symbol.iterator](): IterableIterator<[any, any]>;
}
