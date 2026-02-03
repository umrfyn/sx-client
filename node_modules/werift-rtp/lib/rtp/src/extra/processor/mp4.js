"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MP4Base = void 0;
const common_1 = require("../../imports/common");
const __1 = require("../..");
const mp4_1 = require("../container/mp4");
class MP4Base {
    constructor(tracks, output, options = {}) {
        Object.defineProperty(this, "tracks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tracks
        });
        Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: output
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "internalStats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stopped", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "onStopped", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new common_1.Event()
        });
        Object.defineProperty(this, "processAudioInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ({ frame }) => {
                const track = this.tracks.find((t) => t.kind === "audio");
                if (frame) {
                    if (!this.container.audioTrack) {
                        this.container.write({
                            codec: track.codec,
                            description: (0, __1.buffer2ArrayBuffer)(__1.OpusRtpPayload.createCodecPrivate()),
                            numberOfChannels: 2,
                            sampleRate: track.clockRate,
                            track: "audio",
                        });
                    }
                    else {
                        this.container.write({
                            byteLength: frame.data.length,
                            duration: null,
                            timestamp: frame.time * 1000,
                            type: "key",
                            copyTo: (destination) => {
                                //@ts-expect-error
                                frame.data.copy(destination);
                            },
                            track: "audio",
                        });
                    }
                }
            }
        });
        Object.defineProperty(this, "processVideoInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ({ frame }) => {
                const track = this.tracks.find((t) => t.kind === "video");
                if (frame) {
                    if (!this.container.videoTrack) {
                        if (frame.isKeyframe) {
                            const avcc = (0, mp4_1.annexb2avcc)(frame.data);
                            const [displayAspectWidth, displayAspectHeight] = computeRatio(track.width, track.height);
                            this.container.write({
                                codec: track.codec,
                                codedWidth: track.width,
                                codedHeight: track.height,
                                description: avcc.buffer,
                                displayAspectWidth,
                                displayAspectHeight,
                                track: "video",
                            });
                            this.container.write({
                                byteLength: frame.data.length,
                                duration: null,
                                timestamp: frame.time * 1000,
                                type: "key",
                                copyTo: (destination) => {
                                    //@ts-expect-error
                                    frame.data.copy(destination);
                                },
                                track: "video",
                            });
                        }
                    }
                    else {
                        this.container.write({
                            byteLength: frame.data.length,
                            duration: null,
                            timestamp: frame.time * 1000,
                            type: frame.isKeyframe ? "key" : "delta",
                            copyTo: (destination) => {
                                //@ts-expect-error
                                frame.data.copy(destination);
                            },
                            track: "video",
                        });
                    }
                }
            }
        });
        this.container = new mp4_1.Mp4Container({
            track: {
                audio: !!this.tracks.find((t) => t.kind === "audio"),
                video: !!this.tracks.find((t) => t.kind === "video"),
            },
        });
        this.container.onData.subscribe((data) => {
            this.output(data);
        });
    }
    toJSON() {
        return {
            ...this.internalStats,
        };
    }
    start() { }
    stop() { }
}
exports.MP4Base = MP4Base;
function computeRatio(a, b) {
    function gcd(x, y) {
        while (y !== 0) {
            const temp = y;
            y = x % y;
            x = temp;
        }
        return x;
    }
    const divisor = gcd(a, b);
    return [a / divisor, b / divisor];
}
//# sourceMappingURL=mp4.js.map