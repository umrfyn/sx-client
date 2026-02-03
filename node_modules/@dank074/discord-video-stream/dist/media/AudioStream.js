import { BaseMediaStream } from "./BaseMediaStream.js";
export class AudioStream extends BaseMediaStream {
    constructor(udp, noSleep = false) {
        super("audio", noSleep);
        this.udp = udp;
    }
    async _sendFrame(frame, frametime) {
        await this.udp.sendAudioFrame(frame, frametime);
    }
}
