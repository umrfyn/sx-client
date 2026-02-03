"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SrtpContext = void 0;
const rtp_1 = require("../../rtp/rtp");
const context_1 = require("./context");
class SrtpContext extends context_1.Context {
    constructor(masterKey, masterSalt, profile) {
        super(masterKey, masterSalt, profile);
    }
    encryptRtp(payload, header) {
        const s = this.getSrtpSsrcState(header.ssrc);
        this.updateRolloverCount(header.sequenceNumber, s);
        const enc = this.cipher.encryptRtp(header, payload, s.rolloverCounter);
        return enc;
    }
    decryptRtp(cipherText) {
        const header = rtp_1.RtpHeader.deSerialize(cipherText);
        const s = this.getSrtpSsrcState(header.ssrc);
        this.updateRolloverCount(header.sequenceNumber, s);
        const dec = this.cipher.decryptRtp(cipherText, s.rolloverCounter);
        return dec;
    }
}
exports.SrtpContext = SrtpContext;
//# sourceMappingURL=srtp.js.map