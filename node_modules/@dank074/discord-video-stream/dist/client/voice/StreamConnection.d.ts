import { BaseMediaConnection } from "./BaseMediaConnection.js";
export declare class StreamConnection extends BaseMediaConnection {
    private _streamKey;
    private _serverId;
    setSpeaking(speaking: boolean): void;
    get serverId(): string | null;
    set serverId(id: string);
    get streamKey(): string | null;
    set streamKey(value: string);
}
