export interface TransportEncryptor {
    encrypt(plaintext: Buffer, additionalData: Buffer): Promise<[Buffer, Buffer]>;
}
export declare class AES256TransportEncryptor implements TransportEncryptor {
    private _nonce;
    private _secretKey;
    constructor(secretKey: Buffer);
    encrypt(plaintext: Buffer, additionalData: Buffer): Promise<[Buffer, Buffer]>;
}
export declare class Chacha20TransportEncryptor implements TransportEncryptor {
    private static sodium;
    private _nonce;
    private _secretKey;
    constructor(secretKey: Buffer);
    encrypt(plaintext: Buffer, additionalData: Buffer): Promise<[Buffer, Buffer]>;
}
