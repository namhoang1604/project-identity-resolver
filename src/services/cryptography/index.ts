export * from './crypto';

interface IEncryptionResult {
    cipherText: string;
    iv: string;
    tag: string;
    type: string;
}

export interface ICryptographyService {
    /**
     * Generates a hash from a given string.
     * @param input The string to hash.
     * @returns The hash of the input string.
     */
    computeHash(input: string): string;

    /**
     * Generates a cryptographic key.
     * This key is intended for use with the encryptString method.
     * @returns The generated key.
     */
    generateEncryptionKey(): string;

    /**
     * Encrypts a given string using a cryptographic key.
     * @param input The string to encrypt.
     * @param key The cryptographic key for encryption.
     * @returns The encrypted string.
     */
    encryptString(input: string, key: string): IEncryptionResult;
}
