import { VoiceOpCodes } from "../voice/VoiceOpCodes.js";
import { BaseMediaConnection } from "./BaseMediaConnection.js";
export class StreamConnection extends BaseMediaConnection {
    constructor() {
        super(...arguments);
        this._streamKey = null;
        this._serverId = null;
    }
    setSpeaking(speaking) {
        if (!this.webRtcParams)
            throw new Error("WebRTC connection not ready");
        this.sendOpcode(VoiceOpCodes.SPEAKING, {
            delay: 0,
            speaking: speaking ? 2 : 0,
            ssrc: this.webRtcParams.audioSsrc
        });
    }
    get serverId() {
        return this._serverId;
    }
    set serverId(id) {
        this._serverId = id;
    }
    get streamKey() {
        return this._streamKey;
    }
    set streamKey(value) {
        this._streamKey = value;
    }
}
