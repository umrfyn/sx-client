import { RtcpPayloadSpecificFeedback } from "./psfb";
import { RtcpRrPacket } from "./rr";
import { RtcpTransportLayerFeedback } from "./rtpfb";
import { RtcpSourceDescriptionPacket } from "./sdes";
import { RtcpSrPacket } from "./sr";
export type RtcpPacket = RtcpRrPacket | RtcpSrPacket | RtcpPayloadSpecificFeedback | RtcpSourceDescriptionPacket | RtcpTransportLayerFeedback;
export declare class RtcpPacketConverter {
    static serialize(type: number, count: number, payload: Buffer, length: number): Buffer<ArrayBuffer>;
    static deSerialize(data: Buffer): RtcpPacket[];
}
export declare function isRtcp(buf: Buffer): boolean;
