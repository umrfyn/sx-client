"use strict";

const assert = require('assert');
const expect = require('chai').expect;
const Util = require('../lib/util');

describe('Util', function () {
    it('Addition with carry', async function () {
        let x, c;
        [x, c] = Util.add_overflow(0xffffffff, 1);
        expect(x).to.be.equal(0);
        expect(c).to.be.equal(1);

        [x, c] = Util.add_overflow(0xffffffff, 2);
        expect(x).to.be.equal(1);
        expect(c).to.be.equal(1);
        [x, c] = Util.add_overflow(0xffffffff, 0xffff);
        expect(x).to.be.equal(0xfffe);
        expect(c).to.be.equal(1);
    });
});
