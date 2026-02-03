"use strict";

module.exports = class Util
{
    /**
     * Performs addition with overflow. Returns the sum and any carry bits.
     *
     * @param {number} a
     * @param {number} b
     * @param {number} extra (optional)
     * @return {number[]}
     */
    static add_overflow(a, b, extra = 0)
    {
        let c, x, y;
        x = (a & 0xffff) + (b & 0xffff) + (extra & 0xffff);
        c = x >>> 16;
        y = (a >>> 16) + (b >>> 16) + (extra >>> 16) + c;
        c = y >>> 16;
        return [y << 16 | (x & 0xffff), c];
    }

    /**
     * Node.js only supports 32-bit numbers so we discard the top 4 bytes.
     *
     * @param {Buffer} buf
     * @return {Number}
     */
    static load32_le(buf)
    {
        return buf.readInt32LE(0) >>> 0;
    }

    /**
     * Store a 32-bit integer as a buffer of length 4
     *
     * @param {Number} num
     * @return {Buffer}
     */
    static store32_le(num)
    {
        let result = Buffer.alloc(4, 0);
        result[0] = num & 0xff;
        result[1] = (num >>>  8) & 0xff;
        result[2] = (num >>> 16) & 0xff;
        result[3] = (num >>> 24) & 0xff;
        return result;
    }
};
