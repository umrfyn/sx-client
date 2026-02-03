"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stream = exports.New = exports.Log = exports.ISOFile = exports.BoxParser = void 0;
exports.isAudioTrack = isAudioTrack;
exports.isVideoTrack = isVideoTrack;
var mp4box_1 = require("mp4box");
Object.defineProperty(exports, "BoxParser", { enumerable: true, get: function () { return mp4box_1.BoxParser; } });
Object.defineProperty(exports, "ISOFile", { enumerable: true, get: function () { return mp4box_1.ISOFile; } });
Object.defineProperty(exports, "Log", { enumerable: true, get: function () { return mp4box_1.Log; } });
Object.defineProperty(exports, "New", { enumerable: true, get: function () { return mp4box_1.createFile; } });
Object.defineProperty(exports, "Stream", { enumerable: true, get: function () { return mp4box_1.DataStream; } });
const mp4box_2 = require("mp4box");
function isAudioTrack(track) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return track.audio !== undefined;
}
function isVideoTrack(track) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return track.video !== undefined;
}
// TODO contribute to mp4box
mp4box_2.BoxParser.dOpsBox.prototype.write = function (stream) {
    this.size = 11;
    this.writeHeader(stream);
    stream.writeUint8(0);
    stream.writeUint8(this.OutputChannelCount);
    stream.writeUint16(this.PreSkip);
    stream.writeUint32(this.InputSampleRate);
    stream.writeUint16(0);
    stream.writeUint8(0);
};
//# sourceMappingURL=mp4box.js.map