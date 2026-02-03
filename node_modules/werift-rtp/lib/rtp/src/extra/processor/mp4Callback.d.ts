import { MP4Base, type Mp4Input, type Mp4Output, type Track } from "./mp4";
import type { WebmOption } from "./webm";
export declare class MP4Callback extends MP4Base {
    private cb?;
    private queue;
    constructor(tracks: Track[], options?: WebmOption);
    pipe: (cb: (input: Mp4Output) => Promise<void>) => void;
    inputAudio: (input: Mp4Input) => void;
    inputVideo: (input: Mp4Input) => void;
    destroy: () => void;
    static saveToFileSystem: (path: string) => (value: Mp4Output) => Promise<void>;
}
