import {
    encryptString as oaEncryptString,
    generateEncryptionKey as oaGenerateEncryptionKey,
} from '@govtechsg/oa-encryption';
import { computeEntryHash } from '@veramo/utils';
import { ICryptographyService } from './index';

/**
 * Service for cryptography operations.
 */
export class CryptographyService implements ICryptographyService {
    /**
     * Computes the hash of the input string.
     * @param input - The input string to compute the hash for.
     * @returns The computed hash.
     */
    computeHash(input: string) {
        const hash = computeEntryHash(input);

        return hash;
    }

    /**
     * Generates an encryption key.
     * @returns The generated encryption key.
     */
    generateEncryptionKey() {
        const encryptionKey = oaGenerateEncryptionKey();

        return encryptionKey;
    }

    /**
     * Encrypts a string using the provided key.
     * @param input - The string to encrypt.
     * @param key - The encryption key to use.
     * @returns The encrypted document.
     */
    encryptString(input: string, key: string) {
        const encryptedDocument = oaEncryptString(input, key);

        delete (encryptedDocument as any).key;

        return encryptedDocument;
    }
}
