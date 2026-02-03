import { Event } from "../../../imports/common";
type DecoderConfig = AudioDecoderConfig | VideoDecoderConfig;
type EncodedChunk = EncodedAudioChunk | EncodedVideoChunk;
export type DataType = "init" | "delta" | "key";
export interface Mp4Data {
    type: DataType;
    timestamp: number;
    duration: number;
    data: Uint8Array;
    kind: "audio" | "video";
}
export declare class Mp4Container {
    #private;
    private props;
    audioTrack?: number;
    videoTrack?: number;
    onData: Event<[Mp4Data]>;
    constructor(props: {
        track: {
            audio: boolean;
            video: boolean;
        };
    });
    get tracksReady(): boolean;
    write(frame: (DecoderConfig | EncodedChunk) & {
        track: "video" | "audio";
    }): void;
    frameBuffer: (EncodedChunk & {
        track: "video" | "audio";
    })[];
    private _enqueue;
}
export interface AudioDecoderConfig {
    codec: string;
    description?: ArrayBuffer | undefined;
    numberOfChannels: number;
    sampleRate: number;
}
export interface VideoDecoderConfig {
    codec: string;
    codedHeight?: number | undefined;
    codedWidth?: number | undefined;
    description?: ArrayBuffer | undefined;
    displayAspectHeight?: number | undefined;
    displayAspectWidth?: number | undefined;
    optimizeForLatency?: boolean | undefined;
}
interface EncodedAudioChunk {
    readonly byteLength: number;
    readonly duration: number | null;
    readonly timestamp: number;
    readonly type: EncodedAudioChunkType;
    copyTo(destination: ArrayBuffer): void;
}
type EncodedAudioChunkType = "delta" | "key";
interface EncodedVideoChunk {
    readonly byteLength: number;
    readonly duration: number | null;
    readonly timestamp: number;
    readonly type: EncodedVideoChunkType;
    copyTo(destination: ArrayBuffer): void;
}
type EncodedVideoChunkType = "delta" | "key";
export declare const mp4SupportedCodecs: readonly ["avc1", "opus"];
export type Mp4SupportedCodec = (typeof mp4SupportedCodecs)[number];
export {};
