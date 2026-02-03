"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEB128 = exports.SignedLEB128 = exports.UnsignedLEB128 = void 0;
var Mask;
(function (Mask) {
    Mask[Mask["LOWER_7"] = 127] = "LOWER_7";
    Mask[Mask["UPPER_1"] = 128] = "UPPER_1";
})(Mask || (Mask = {}));
/**
 * Check if a given value is a safe integer
 * @param a Value to check
 */
const int = (a) => Number.isSafeInteger(a);
/**
 * Class to work with unsigned LEB128 integers.
 * See [this Wikipedia article](https://en.wikipedia.org/wiki/LEB128#Encoding_format).
 */
class UnsignedLEB128 {
    /**
     * Decode a Uint8Array into a number.
     * @param buf Uint8Array containing the representation in LEB128
     * @param offset Offset to read from
     */
    static decode(buf, offset = 0) {
        const mp = this.$scanForNullBytes(buf, offset);
        let result = 0, shift = 0;
        for (let d = 0; d <= mp - offset; d++) {
            const a = buf[offset + d] & Mask.LOWER_7; /* masking, we only care about lower 7 bits */
            result |= a << shift; /* shift this value left and add it */
            shift += (8 - 1);
        }
        return result;
    }
    /**
     * Create a LEB128 Uint8Array from a number
     * @param number Number to convert from
     */
    static encode(number) {
        this.check(number);
        if (number < 0)
            throw new Error(`An unsigned number must NOT be negative, ${number} is!`);
        let out = [], a = number;
        do {
            let byte = a & Mask.LOWER_7;
            // we only care about lower 7 bits
            a >>= (8 - 1);
            // shift
            if (a)
                byte = byte | Mask.UPPER_1; /* if remaining is truthy (!= 0), set highest bit */
            out.push(byte);
        } while (a);
        return Uint8Array.from(out);
    }
    static check(n) {
        if (!int(n))
            throw new Error(`${n} is not a safe integer!`);
    }
    /**
     * Return the offset that the byte at which ends the stream
     * @param buf Uint8Array to scan
     * @param offset Offset to start scanning
     * @throws If no byte starting with 0 as the highest bit set
     */
    static $scanForNullBytes(buf, offset = 0) {
        let count = offset, tmp = 0;
        do {
            if (count >= buf.byteLength)
                throw new Error('This is not a LEB128-encoded Uint8Array, no ending found!');
            tmp = buf.slice(count, count + 1)[0];
            count++;
        } while (tmp & Mask.UPPER_1);
        return count - 1;
    }
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
    static getLength(buf, offset = 0) {
        return this.$scanForNullBytes(buf, offset) - offset;
    }
}
exports.UnsignedLEB128 = UnsignedLEB128;
class SignedLEB128 {
    static $ceil7mul(n) {
        let a = n;
        while (a % 7)
            a++;
        return a;
    }
    static check(n) {
        if (!int(n))
            throw new Error(`${n} is not a safe integer!`);
    }
    /**
     * Create a LEB128 Uint8Array from a number
     * @param number Number to convert from. Must be less than 0.
     */
    static encode(number) {
        this.check(number);
        if (number >= 0)
            throw new Error(`A signed number must be negative, ${number} isn't!`);
        const bitCount = Math.ceil(Math.log2(-number));
        return UnsignedLEB128.encode((1 << this.$ceil7mul(bitCount)) + number);
    }
    /**
     * Decode a Uint8Array into a (signed) number.
     * @param buf Uint8Array containing the representation in LEB128
     * @param offset Offset to read from
     */
    static decode(buf, offset = 0) {
        const r = UnsignedLEB128.decode(buf, offset);
        const bitCount = Math.ceil(Math.log2(r));
        const mask = (1 << bitCount);
        return -(mask - r);
    }
}
exports.SignedLEB128 = SignedLEB128;
class LEB128 {
}
exports.LEB128 = LEB128;
/**
 * Create a LEB128 Uint8Array from a number
 * @param number Number to convert from.
 */
LEB128.encode = (n) => (n >= 0 ? UnsignedLEB128 : SignedLEB128).encode(n);
/**
 * Decode a Uint8Array into a (signed) number.
 * @param buf Uint8Array containing the representation in LEB128
 * @param offset Offset to read from
 * @param s Whether the output number is negative
 */
LEB128.decode = (buf, offset = 0, s = false) => (s ? SignedLEB128 : UnsignedLEB128).decode(buf, offset);
