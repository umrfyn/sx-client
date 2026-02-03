import { CipherAesBase } from ".";
import { RtcpHeader } from "../../rtcp/header";
import { RtpHeader } from "../../rtp/rtp";
export declare class CipherAesGcm extends CipherAesBase {
    readonly aeadAuthTagLen = 16;
    readonly rtpIvWriter: (values: (number | bigint)[]) => Buffer<ArrayBuffer>;
    readonly rtcpIvWriter: (values: (number | bigint)[]) => Buffer<ArrayBuffer>;
    readonly aadWriter: (values: (number | bigint)[]) => Buffer<ArrayBuffer>;
    constructor(srtpSessionKey: Buffer, srtpSessionSalt: Buffer, srtcpSessionKey: Buffer, srtcpSessionSalt: Buffer);
    encryptRtp(header: RtpHeader, payload: Buffer, rolloverCounter: number): Buffer<ArrayBuffer>;
    decryptRtp(cipherText: Buffer, rolloverCounter: number): [Buffer, RtpHeader];
    encryptRTCP(rtcpPacket: Buffer, srtcpIndex: number): Buffer;
    decryptRTCP(encrypted: Buffer): [Buffer, RtcpHeader];
    private rtpInitializationVector;
    private rtcpInitializationVector;
    private rtcpAdditionalAuthenticatedData;
}
