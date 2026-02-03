import type { MediaUdp } from "../client/voice/MediaUdp.js";
import { BaseMediaStream } from "./BaseMediaStream.js";
export declare class AudioStream extends BaseMediaStream {
    udp: MediaUdp;
    constructor(udp: MediaUdp, noSleep?: boolean);
    protected _sendFrame(frame: Buffer, frametime: number): Promise<void>;
}
