"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mp4Container_instances, _Mp4Container_mp4, _Mp4Container_audioFrame, _Mp4Container_videoFrame, _Mp4Container_audioSegment, _Mp4Container_videoSegment, _Mp4Container_init, _Mp4Container_enqueue;
Object.defineProperty(exports, "__esModule", { value: true });
exports.mp4SupportedCodecs = exports.Mp4Container = void 0;
const common_1 = require("../../../imports/common");
const MP4 = __importStar(require("./mp4box"));
class Mp4Container {
    constructor(props) {
        _Mp4Container_instances.add(this);
        Object.defineProperty(this, "props", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: props
        });
        _Mp4Container_mp4.set(this, void 0);
        _Mp4Container_audioFrame.set(this, void 0);
        _Mp4Container_videoFrame.set(this, void 0); // 1 frame buffer
        Object.defineProperty(this, "audioTrack", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "videoTrack", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _Mp4Container_audioSegment.set(this, 0);
        _Mp4Container_videoSegment.set(this, 0);
        Object.defineProperty(this, "onData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new common_1.Event()
        });
        Object.defineProperty(this, "frameBuffer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        __classPrivateFieldSet(this, _Mp4Container_mp4, new MP4.ISOFile(), "f");
        __classPrivateFieldGet(this, _Mp4Container_mp4, "f").init();
    }
    get tracksReady() {
        let ready = true;
        if (this.props.track.audio && !this.audioTrack) {
            ready = false;
        }
        if (this.props.track.video && !this.videoTrack) {
            ready = false;
        }
        return ready;
    }
    write(frame) {
        if (isDecoderConfig(frame)) {
            return __classPrivateFieldGet(this, _Mp4Container_instances, "m", _Mp4Container_init).call(this, frame);
        }
        else {
            return __classPrivateFieldGet(this, _Mp4Container_instances, "m", _Mp4Container_enqueue).call(this, frame);
        }
    }
    _enqueue(frame) {
        const track = frame.track === "audio" ? this.audioTrack : this.videoTrack;
        if (!track) {
            throw new Error("track missing");
        }
        // Check if we should create a new segment
        if (frame.track === "video") {
            if (frame.type == "key") {
                __classPrivateFieldSet(this, _Mp4Container_videoSegment, __classPrivateFieldGet(this, _Mp4Container_videoSegment, "f") + 1, "f");
            }
            else if (__classPrivateFieldGet(this, _Mp4Container_videoSegment, "f") == 0) {
                throw new Error("must start with keyframe");
            }
        }
        else {
            __classPrivateFieldSet(this, _Mp4Container_audioSegment, __classPrivateFieldGet(this, _Mp4Container_audioSegment, "f") + 1, "f");
        }
        // We need a one frame buffer to compute the duration
        if (frame.track === "video") {
            if (!__classPrivateFieldGet(this, _Mp4Container_videoFrame, "f")) {
                __classPrivateFieldSet(this, _Mp4Container_videoFrame, frame, "f");
                return;
            }
        }
        else {
            if (!__classPrivateFieldGet(this, _Mp4Container_audioFrame, "f")) {
                __classPrivateFieldSet(this, _Mp4Container_audioFrame, frame, "f");
                return;
            }
        }
        const bufferFrame = frame.track === "video" ? __classPrivateFieldGet(this, _Mp4Container_videoFrame, "f") : __classPrivateFieldGet(this, _Mp4Container_audioFrame, "f");
        if (!bufferFrame) {
            throw new Error("bufferFrame missing");
        }
        const duration = frame.timestamp - bufferFrame.timestamp;
        // TODO avoid this extra copy by writing to the mdat directly
        // ...which means changing mp4box.js to take an offset instead of ArrayBuffer
        const buffer = new ArrayBuffer(bufferFrame.byteLength);
        bufferFrame.copyTo(buffer);
        // Add the sample to the container
        __classPrivateFieldGet(this, _Mp4Container_mp4, "f").addSample(track, buffer, {
            duration,
            dts: bufferFrame.timestamp,
            cts: bufferFrame.timestamp,
            is_sync: bufferFrame.type == "key",
        });
        const stream = new MP4.Stream(undefined, 0, MP4.Stream.BIG_ENDIAN);
        // Moof and mdat atoms are written in pairs.
        // TODO remove the moof/mdat from the Box to reclaim memory once everything works
        for (;;) {
            const moof = __classPrivateFieldGet(this, _Mp4Container_mp4, "f").moofs.shift();
            const mdat = __classPrivateFieldGet(this, _Mp4Container_mp4, "f").mdats.shift();
            if (!moof && !mdat)
                break;
            if (!moof)
                throw new Error("moof missing");
            if (!mdat)
                throw new Error("mdat missing");
            moof.write(stream);
            mdat.write(stream);
        }
        // TODO avoid this extra copy by writing to the buffer provided in copyTo
        const data = new Uint8Array(stream.buffer);
        if (frame.track === "video") {
            __classPrivateFieldSet(this, _Mp4Container_videoFrame, frame, "f");
        }
        else {
            __classPrivateFieldSet(this, _Mp4Container_audioFrame, frame, "f");
        }
        const res = {
            type: bufferFrame.type,
            timestamp: bufferFrame.timestamp,
            kind: frame.track,
            duration,
            data,
        };
        this.onData.execute(res);
    }
}
exports.Mp4Container = Mp4Container;
_Mp4Container_mp4 = new WeakMap(), _Mp4Container_audioFrame = new WeakMap(), _Mp4Container_videoFrame = new WeakMap(), _Mp4Container_audioSegment = new WeakMap(), _Mp4Container_videoSegment = new WeakMap(), _Mp4Container_instances = new WeakSet(), _Mp4Container_init = function _Mp4Container_init(frame) {
    let codec = frame.codec.substring(0, 4);
    if (codec == "opus") {
        codec = "Opus";
    }
    const options = {
        type: codec,
        timescale: 1000000,
    };
    if (isVideoConfig(frame)) {
        options.width = frame.codedWidth;
        options.height = frame.codedHeight;
    }
    else {
        options.channel_count = frame.numberOfChannels;
        options.samplerate = frame.sampleRate;
        options.hdlr = "soun";
    }
    if (!frame.description)
        throw new Error("missing frame description");
    const desc = frame.description;
    if (codec === "avc1") {
        options.avcDecoderConfigRecord = desc;
    }
    else if (codec === "hev1") {
        options.hevcDecoderConfigRecord = desc;
    }
    else if (codec === "Opus") {
        // description is an identification header: https://datatracker.ietf.org/doc/html/rfc7845#section-5.1
        // The first 8 bytes are the magic string "OpusHead", followed by what we actually want.
        const dops = new MP4.BoxParser.dOpsBox();
        // Annoyingly, the header is little endian while MP4 is big endian, so we have to parse.
        dops.parse(new MP4.Stream(desc, 8, MP4.Stream.LITTLE_ENDIAN));
        options.description = dops;
    }
    else {
        throw new Error(`unsupported codec: ${codec}`);
    }
    const track = __classPrivateFieldGet(this, _Mp4Container_mp4, "f").addTrack(options);
    if (track == undefined) {
        throw new Error("failed to initialize MP4 track");
    }
    if (frame.track === "audio") {
        this.audioTrack = track;
    }
    else {
        this.videoTrack = track;
    }
    if (!this.tracksReady) {
        return;
    }
    const buffer = MP4.ISOFile.writeInitializationSegment(__classPrivateFieldGet(this, _Mp4Container_mp4, "f").ftyp, __classPrivateFieldGet(this, _Mp4Container_mp4, "f").moov, 0, 0);
    const data = new Uint8Array(buffer);
    const res = {
        type: "init",
        timestamp: 0,
        duration: 0,
        data,
        kind: frame.track,
    };
    this.onData.execute(res);
}, _Mp4Container_enqueue = function _Mp4Container_enqueue(frame) {
    this.frameBuffer.push(frame);
    if (!this.tracksReady) {
        return;
    }
    for (const frame of this.frameBuffer) {
        this._enqueue(frame);
    }
    this.frameBuffer = [];
};
function isDecoderConfig(frame) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return frame.codec !== undefined;
}
function isVideoConfig(frame) {
    return frame.codedWidth !== undefined;
}
exports.mp4SupportedCodecs = ["avc1", "opus"];
//# sourceMappingURL=container.js.map