import { CredentialsService } from './service';

jest.mock('../../config', () => ({
    AVAILABLE_BUCKETS: ['bucketName'],
}));

describe('CredentialsService', () => {
    let credentialsService: CredentialsService;

    beforeEach(() => {
        credentialsService = new CredentialsService();
    });

    describe('encryptAndStoreCredential', () => {
        it('should encrypt and store credentials', async () => {
            const bucket = 'bucketName';
            const filename = 'credentials';
            const data = { test: 'data' };

            const cryptographyService = {
                computeHash: jest.fn().mockReturnValue('hash'),
                generateEncryptionKey: jest.fn().mockReturnValue('key'),
                encryptString: jest.fn().mockReturnValue({ encryptedData: 'encryptedData' }),
            };
            const storageService = {
                uploadFile: jest.fn().mockResolvedValue({ uri: 'fileUri' }),
            };

            const result = await credentialsService.encryptAndStoreCredential(cryptographyService, storageService, {
                bucket,
                filename,
                data,
            });

            expect(cryptographyService.computeHash).toHaveBeenCalledWith(JSON.stringify(data));
            expect(cryptographyService.generateEncryptionKey).toHaveBeenCalled();
            expect(cryptographyService.encryptString).toHaveBeenCalledWith(JSON.stringify(data), 'key');
            expect(storageService.uploadFile).toHaveBeenCalledWith(
                bucket,
                `${filename}.json`,
                JSON.stringify({ encryptedData: 'encryptedData' }),
                'application/json',
            );
            expect(result).toEqual({
                uri: 'fileUri',
                hash: 'hash',
                key: 'key',
            });
        });

        it('should throw an error if bucket or filename is not provided', async () => {
            const bucket = '';
            const filename = 'credentials';
            const data = { test: 'data' };

            const cryptographyService = {};
            const storageService = {};

            await expect(
                credentialsService.encryptAndStoreCredential(cryptographyService as any, storageService as any, {
                    bucket,
                    filename,
                    data,
                }),
            ).rejects.toThrow('Bucket and filename are required');
        });

        it('should throw an error if the bucket is not in AVAILABLE_BUCKETS', async () => {
            const cryptographyService = {};
            const storageService = {};

            const invalidBucket = 'invalidBucketName';
            const filename = 'credentials';
            const data = { test: 'data' };

            await expect(
                credentialsService.encryptAndStoreCredential(cryptographyService as any, storageService as any, {
                    bucket: invalidBucket,
                    filename,
                    data,
                }),
            ).rejects.toThrow('Invalid bucket');
        });

        it('should throw an error if data is not a plain object', async () => {
            const cryptographyService = {};
            const storageService = {};

            const bucket = 'bucketName';
            const filename = 'credentials';
            const data = 'notAPlainObject';

            await expect(
                credentialsService.encryptAndStoreCredential(cryptographyService as any, storageService as any, {
                    bucket,
                    filename,
                    data: data as any,
                }),
            ).rejects.toThrow('Data must be a JSON object');
        });
    });
});
