export interface Chunk {
    type: "init" | "key" | "delta";
    timestamp: number;
    duration: number;
    data: Uint8Array;
}
