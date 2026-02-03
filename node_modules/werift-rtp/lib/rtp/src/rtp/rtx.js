"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapRtx = unwrapRtx;
exports.wrapRtx = wrapRtx;
const jspack_1 = require("@shinyoshiaki/jspack");
const rtp_1 = require("./rtp");
function unwrapRtx(rtx, payloadType, ssrc) {
    const packet = new rtp_1.RtpPacket(new rtp_1.RtpHeader({
        payloadType,
        marker: rtx.header.marker,
        sequenceNumber: jspack_1.jspack.Unpack("!H", rtx.payload.subarray(0, 2))[0],
        timestamp: rtx.header.timestamp,
        ssrc,
    }), rtx.payload.subarray(2));
    return packet;
}
function wrapRtx(packet, payloadType, sequenceNumber, ssrc) {
    const rtx = new rtp_1.RtpPacket(new rtp_1.RtpHeader({
        payloadType,
        marker: packet.header.marker,
        sequenceNumber,
        timestamp: packet.header.timestamp,
        ssrc,
        csrc: packet.header.csrc,
        extensions: packet.header.extensions,
    }), Buffer.concat([
        Buffer.from(jspack_1.jspack.Pack("!H", [packet.header.sequenceNumber])),
        packet.payload,
    ]));
    return rtx;
}
//# sourceMappingURL=rtx.js.map