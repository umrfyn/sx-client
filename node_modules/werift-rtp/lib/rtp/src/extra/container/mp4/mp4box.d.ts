export type { MP4ArrayBuffer as ArrayBuffer, MP4AudioTrack as AudioTrack, MP4File as File, MP4Info as Info, Sample, SampleOptions, MP4Track as Track, TrackOptions, MP4VideoTrack as VideoTrack, } from "mp4box";
export { BoxParser, ISOFile, Log, createFile as New, DataStream as Stream, } from "mp4box";
import { type MP4AudioTrack, type MP4Track, type MP4VideoTrack } from "mp4box";
export declare function isAudioTrack(track: MP4Track): track is MP4AudioTrack;
export declare function isVideoTrack(track: MP4Track): track is MP4VideoTrack;
