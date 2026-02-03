import { Event } from "../../imports/common";
import { type DataType, type Mp4SupportedCodec } from "../container/mp4";
import type { AVProcessor } from "./interface";
export type Mp4Input = {
    frame?: {
        data: Buffer;
        isKeyframe: boolean;
        /**ms */
        time: number;
    };
    eol?: boolean;
};
export interface Mp4Output {
    type: DataType;
    timestamp: number;
    duration: number;
    data: Uint8Array;
    eol?: boolean;
    kind: "audio" | "video";
}
export interface MP4Option {
    /**ms */
    duration?: number;
    encryptionKey?: Buffer;
    strictTimestamp?: boolean;
}
export declare class MP4Base implements AVProcessor<Mp4Input> {
    tracks: Track[];
    private output;
    private options;
    private internalStats;
    private container;
    stopped: boolean;
    onStopped: Event<any[]>;
    constructor(tracks: Track[], output: (output: Mp4Output) => void, options?: MP4Option);
    toJSON(): Record<string, any>;
    processAudioInput: ({ frame }: Mp4Input) => void;
    processVideoInput: ({ frame }: Mp4Input) => void;
    protected start(): void;
    stop(): void;
}
export interface Track {
    width?: number;
    height?: number;
    kind: "audio" | "video";
    codec: Mp4SupportedCodec;
    clockRate: number;
    trackNumber: number;
}
