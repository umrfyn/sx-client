/**
 * Class to work with unsigned LEB128 integers.
 * See [this Wikipedia article](https://en.wikipedia.org/wiki/LEB128#Encoding_format).
 */
export declare class UnsignedLEB128 {
    /**
     * Decode a Uint8Array into a number.
     * @param buf Uint8Array containing the representation in LEB128
     * @param offset Offset to read from
     */
    static decode(buf: Uint8Array, offset?: number): number;
    /**
     * Create a LEB128 Uint8Array from a number
     * @param number Number to convert from
     */
    static encode(number: number): Uint8Array;
    private static check;
    /**
     * Return the offset that the byte at which ends the stream
     * @param buf Uint8Array to scan
     * @param offset Offset to start scanning
     * @throws If no byte starting with 0 as the highest bit set
     */
    private static $scanForNullBytes;
    /**
     * Return the relative index that the byte at which ends the stream.
     *
     * @example
     * ```js
     * getLength(Uint8Array.from([0b1000000, 0b00000000]), 1) // 0
     * getLength(Uint8Array.from([0b1000000, 0b00000000]), 0) // 1
     * ```
     * @param buf Uint8Array to scan
     * @param offset Offset to start scanning
     */
    static getLength(buf: Uint8Array, offset?: number): number;
}
export declare class SignedLEB128 {
    private static $ceil7mul;
    private static check;
    /**
     * Create a LEB128 Uint8Array from a number
     * @param number Number to convert from. Must be less than 0.
     */
    static encode(number: number): Uint8Array;
    /**
     * Decode a Uint8Array into a (signed) number.
     * @param buf Uint8Array containing the representation in LEB128
     * @param offset Offset to read from
     */
    static decode(buf: Uint8Array, offset?: number): number;
}
export declare class LEB128 {
    /**
     * Create a LEB128 Uint8Array from a number
     * @param number Number to convert from.
     */
    static encode: (n: number) => Uint8Array;
    /**
     * Decode a Uint8Array into a (signed) number.
     * @param buf Uint8Array containing the representation in LEB128
     * @param offset Offset to read from
     * @param s Whether the output number is negative
     */
    static decode: (buf: Uint8Array, offset?: number, s?: boolean) => number;
}
