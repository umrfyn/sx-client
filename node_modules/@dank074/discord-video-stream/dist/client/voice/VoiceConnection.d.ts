import type { StreamConnection } from './StreamConnection.js';
import { BaseMediaConnection } from './BaseMediaConnection.js';
export declare class VoiceConnection extends BaseMediaConnection {
    streamConnection?: StreamConnection;
    get serverId(): string;
    stop(): void;
}
