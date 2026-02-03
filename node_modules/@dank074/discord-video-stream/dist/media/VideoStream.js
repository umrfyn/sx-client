import { BaseMediaStream } from "./BaseMediaStream.js";
export class VideoStream extends BaseMediaStream {
    constructor(udp, noSleep = false) {
        super("video", noSleep);
        this.udp = udp;
    }
    async _sendFrame(frame, frametime) {
        await this.udp.sendVideoFrame(frame, frametime);
    }
}
