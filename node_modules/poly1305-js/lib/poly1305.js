"use strict";

const BigInteger = require('big-integer');
const crypto = require('crypto');
const Util = require('./util');

const BLOCK_SIZE = 16;

module.exports = class Poly1305
{
    /**
     * @param {Buffer} message
     * @param {Buffer} key
     * @return {Promise<Buffer>}
     */
    static async onetimeauth(message, key)
    {
        if (!Buffer.isBuffer(message)) {
            message = Buffer.from(message);
        }
        let self = new Poly1305(key);
        await self.update(message);
        return await self.finish();
    }

    /**
     * @param {Buffer} message
     * @param {Buffer} key
     * @param {Buffer} tag
     * @return {Promise<boolean>}
     */
    static async onetimeauth_verify(message, key, tag)
    {
        if (!Buffer.isBuffer(message)) {
            message = Buffer.from(message);
        }
        let self = new Poly1305(key);
        await self.update(message);
        let calc = await self.finish();
        return crypto.timingSafeEqual(calc, tag);
    }

    /**
     * @param {Buffer} key
     */
    constructor(key)
    {
        if (typeof (key) === 'undefined') {
            this.buffer = Buffer.alloc(16, 0);
            this.h = new Uint32Array(5);
            this.r = [0,0,0,0,0];
            this.pad = [0,0,0,0];
            this.leftover = 0;
            this.final = false;
            return;
        }
        if (!Buffer.isBuffer(key)) {
            throw new TypeError("Poly1305 key must be a Buffer (argument 1)");
        }
        if (key.length !== 32) {
            throw new Error("Poly1305 requires a 32-byte key");
        }
        this.buffer = Buffer.alloc(16, 0);

        this.r = [
            Util.load32_le(key.slice(0, 4))           & 0x03ffffff,
            (Util.load32_le(key.slice(3, 7)) >>> 2)   & 0x03ffff03,
            (Util.load32_le(key.slice(6, 10)) >>> 4)  & 0x03ffc0ff,
            (Util.load32_le(key.slice(9, 13)) >>> 6)  & 0x03f03fff,
            (Util.load32_le(key.slice(12, 16)) >>> 8) & 0x000fffff
        ];
        this.h = new Uint32Array(5);
        this.pad = [
            Util.load32_le(key.slice(16, 20)),
            Util.load32_le(key.slice(20, 24)),
            Util.load32_le(key.slice(24, 28)),
            Util.load32_le(key.slice(28, 32))
        ];

        this.leftover = 0;
        this.final = false;
    }

    /**
     * Inspired by PHP's hash_copy()
     *
     * @return {Poly1305}
     */
    clone()
    {
        let clone = new Poly1305();
        this.buffer.copy(clone.buffer, 0, 0, 16);
        clone.r = this.r;
        for (let i = 0; i < 5; i++) {
            clone.h[i] = this.h[i];
        }
        for (let i = 0; i < 4; i++) {
            clone.pad[i] = this.pad[i];
        }
        clone.leftover = this.leftover;
        clone.final = this.final;
        return clone;
    }

    /**
     *
     * @param {Buffer} message
     * @param {number} bytes
     * @return {Promise<void>}
     */
    async blocks(message, bytes)
    {
        if (message.length < 16) {
            throw new Error('Out of range exception');
        }

        let hibit = this.final ? 0 : 1 << 24;
        let [r0, r1, r2, r3, r4] = this.r;

        let s1 = r1 * 5;
        let s2 = r2 * 5;
        let s3 = r3 * 5;
        let s4 = r4 * 5;

        let h0 = BigInteger(this.h[0]);
        let h1 = BigInteger(this.h[1]);
        let h2 = BigInteger(this.h[2]);
        let h3 = BigInteger(this.h[3]);
        let h4 = BigInteger(this.h[4]);

        let offset = 0;
        let c, d0, d1, d2, d3, d4;
        while (bytes >= BLOCK_SIZE) {
            /* h += m[i] */
            h0 = h0.add((Util.load32_le(message.slice(offset,     offset + 4)))        & 0x03ffffff);
            h1 = h1.add((Util.load32_le(message.slice(offset + 3, offset + 7)) >>> 2)  & 0x03ffffff);
            h2 = h2.add((Util.load32_le(message.slice(offset + 6, offset + 10)) >>> 4) & 0x03ffffff);
            h3 = h3.add((Util.load32_le(message.slice(offset + 9, offset + 13)) >>> 6) & 0x03ffffff);
            h4 = h4.add((Util.load32_le(message.slice(offset + 12, offset + 16)) >>> 8) | hibit);

            /* h *= r */
            // d0 = ((h0 * r0) + (s4 * h1) + (s3 * h2) + (s2 * h3) + (s1 * h4));
            d0 = BigInteger(h0.times(BigInteger(r0)))
                .plus(BigInteger(s4).times(h1))
                .plus(BigInteger(s3).times(h2))
                .plus(BigInteger(s2).times(h3))
                .plus(BigInteger(s1).times(h4));

            // d1 = ((h0 * r1) + (h1 * r0) + (s4 * h2) + (s3 * h3) + (s2 * h4));
            d1 = BigInteger(h0.times(BigInteger(r1)))
                .plus(h1.times(BigInteger(r0)))
                .plus(BigInteger(s4).times(h2))
                .plus(BigInteger(s3).times(h3))
                .plus(BigInteger(s2).times(h4));

            // d2 = ((h0 * r2) + (h1 * r1) + (h2 * r0) + (s4 * h3) + (s3 * h4));
            d2 = BigInteger(h0.times(BigInteger(r2)))
                .plus(h1.times(BigInteger(r1)))
                .plus(h2.times(BigInteger(r0)))
                .plus(BigInteger(s4).times(h3))
                .plus(BigInteger(s3).times(h4));

            // d3 = ((h0 * r3) + (h1 * r2) + (h2 * r1) + (h3 * r0) + (s4 * h4));
            d3 = BigInteger(h0.times(BigInteger(r3)))
                .plus(h1.times(BigInteger(r2)))
                .plus(h2.times(BigInteger(r1)))
                .plus(h3.times(BigInteger(r0)))
                .plus(BigInteger(s4).times(h4));
            // d4 = ((h0 * r4) + (h1 * r3) + (h2 * r2) + (h3 * r1) + (h4 * r0));
            d4 = BigInteger(h0.times(BigInteger(r4)))
                .plus(h1.times(BigInteger(r3)))
                .plus(h2.times(BigInteger(r2)))
                .plus(h3.times(BigInteger(r1)))
                .plus(h4.times(BigInteger(r0)));

            /* (partial) h %= p */
            c = d0.shiftRight(26);
            h0 = d0.and(0x3ffffff);
            d1 = d1.add(c);
            c = d1.shiftRight(26);
            h1 = d1.and(0x3ffffff);
            d2 = d2.add(c);
            c = d2.shiftRight(26);
            h2 = d2.and(0x3ffffff);
            d3 = d3.add(c);
            c = d3.shiftRight(26);
            h3 = d3.and(0x3ffffff);
            d4 = d4.add(c);
            c = d4.shiftRight(26);
            h4 = d4.and(0x3ffffff);
            h0 = h0.add(c.multiply(5).toJSNumber());

            c = h0.shiftRight(26);
            h0 = h0.and(0x3ffffff);
            h1 = h1.add(c);

            offset += BLOCK_SIZE;
            bytes -= BLOCK_SIZE;
        }
        this.h[0] = h0.toJSNumber() >>> 0;
        this.h[1] = h1.toJSNumber() >>> 0;
        this.h[2] = h2.toJSNumber() >>> 0;
        this.h[3] = h3.toJSNumber() >>> 0;
        this.h[4] = h4.toJSNumber() >>> 0;
    }

    /**
     *
     * @param {Buffer} message
     * @return {Promise<Poly1305>}
     */
    async update(message)
    {
        let want;
        let bytes = message.length;

        if (this.leftover > 0) {
            want = BLOCK_SIZE - this.leftover;
            if (want > bytes) {
                want = bytes;
            }
            message.slice(0, want).copy(this.buffer, this.leftover, 0);
            this.leftover += want;
            if (this.leftover < BLOCK_SIZE) {
                // We still don't have enough to run this.blocks()
                return this;
            }
            await this.blocks(this.buffer, BLOCK_SIZE);
            this.leftover -= BLOCK_SIZE;
            bytes -= want;
            message = message.slice(want);
        }

        /* process full blocks */
        if (bytes >= BLOCK_SIZE) {
            want = bytes & ~(BLOCK_SIZE - 1);
            if (want >= BLOCK_SIZE) {
                await this.blocks(message.slice(0, want), want);
                message = message.slice(want);
                bytes = message.length;
            }
        }

        /* store leftover */
        if (bytes > 0) {
            message.slice(0, bytes).copy(this.buffer, this.leftover, 0);
            this.leftover += bytes;
        }
        return this;
    }

    /**
     * @return {Promise<Buffer>}
     */
    async finish()
    {
        let c, g0, g1, g2, g3, g4, h0, h1, h2, h3, h4, mask;
        if (this.leftover) {
            let i = this.leftover;
            this.buffer[i++] = 1;
            for (; i < BLOCK_SIZE; i++) {
                this.buffer[i] = 0;
            }
            this.final = true;
            await this.blocks(this.buffer, BLOCK_SIZE);
        }

        h0 = this.h[0];
        h1 = this.h[1];
        h2 = this.h[2];
        h3 = this.h[3];
        h4 = this.h[4];

        c = h1 >>> 26;
        h1 &= 0x3ffffff;
        h2 += c;
        c = h2 >>> 26;
        h2 &= 0x3ffffff;
        h3 += c;
        c = h3 >>> 26;
        h3 &= 0x3ffffff;
        h4 += c;
        c = h4 >>> 26;
        h4 &= 0x3ffffff;
        h0 += c * 5;
        c = h0 >>> 26;
        h0 &= 0x3ffffff;
        h1 += c;

        /* compute h + -p */
        g0 = h0 + 5;
        c = g0 >>> 26;
        g0 &= 0x3ffffff;

        g1 = h1 + c;
        c = g1 >>> 26;
        g1 &= 0x3ffffff;

        g2 = h2 + c;
        c = g2 >>> 26;
        g2 &= 0x3ffffff;

        g3 = h2 + c;
        c = g3 >>> 26;
        g3 &= 0x3ffffff;

        g4 = (h4 +c - (1 << 26)) >>> 0;

        /* select h if h < p, or h + -p if h >= p */
        mask = (g4 >>> 31) - 1;

        g0 &= mask;
        g1 &= mask;
        g2 &= mask;
        g3 &= mask;
        g4 &= mask;

        mask = ~mask >>> 0;
        h0 = (h0 & mask) | g0;
        h1 = (h1 & mask) | g1;
        h2 = (h2 & mask) | g2;
        h3 = (h3 & mask) | g3;
        h4 = (h4 & mask) | g4;

        /* h = h % (2^128) */
        h0 = ((h0) | (h1 << 26)) >>> 0;
        h1 = ((h1 >>>  6) | (h2 << 20)) >>> 0;
        h2 = ((h2 >>> 12) | (h3 << 14)) >>> 0;
        h3 = ((h3 >>> 18) | (h4 <<  8)) >>> 0;

        [h0, c] = Util.add_overflow(h0, this.pad[0]);
        [h1, c] = Util.add_overflow(h1, this.pad[1], c);
        [h2, c] = Util.add_overflow(h2, this.pad[2], c);
        [h3, c] = Util.add_overflow(h3, this.pad[3], c);

        return Buffer.concat([
            Util.store32_le(h0 >>> 0),
            Util.store32_le(h1 >>> 0),
            Util.store32_le(h2 >>> 0),
            Util.store32_le(h3 >>> 0)
        ]);
    }
};
