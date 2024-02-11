import {
    encryptString as oaEncryptString,
    generateEncryptionKey as oaGenerateEncryptionKey,
} from '@govtechsg/oa-encryption';
import { computeEntryHash } from '@veramo/utils';
import { CryptographyService } from './crypto';

jest.mock('@govtechsg/oa-encryption', () => ({
    encryptString: jest.fn(),
    generateEncryptionKey: jest.fn(),
}));

jest.mock('@veramo/utils', () => ({
    computeEntryHash: jest.fn(),
}));

describe('CryptographyService', () => {
    let service: CryptographyService;

    beforeEach(() => {
        service = new CryptographyService();
        jest.clearAllMocks();
    });

    it('should compute hash correctly', () => {
        const input = 'test';
        const expectedHash = 'hashedValue';
        (computeEntryHash as jest.Mock).mockReturnValue(expectedHash);

        const result = service.computeHash(input);

        expect(computeEntryHash).toHaveBeenCalledWith(input);
        expect(result).toBe(expectedHash);
    });

    it('should generate an encryption key', () => {
        const expectedKey = 'encryptionKey';
        (oaGenerateEncryptionKey as jest.Mock).mockReturnValue(expectedKey);

        const result = service.generateEncryptionKey();

        expect(oaGenerateEncryptionKey).toHaveBeenCalled();
        expect(result).toBe(expectedKey);
    });

    it('should encrypt a string correctly', () => {
        const input = 'secret';
        const key = 'encryptionKey';
        const encryptedDocument = {
            encryptedData: 'encryptedSecret',
            key: 'keyShouldBeDeleted',
        };
        (oaEncryptString as jest.Mock).mockReturnValue(encryptedDocument);

        const result = service.encryptString(input, key);

        expect(oaEncryptString).toHaveBeenCalledWith(input, key);
        expect(result).toEqual({ encryptedData: 'encryptedSecret' });
    });
});
