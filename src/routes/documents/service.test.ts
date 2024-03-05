import { DocumentsService } from './service';
import { IStorageService } from '../../services';

jest.mock('../../config', () => ({
    AVAILABLE_BUCKETS: ['my-bucket'],
}));

describe('DocumentsService', () => {
    let documentsService: DocumentsService;
    let storageServiceMock: jest.Mocked<IStorageService>;

    beforeEach(() => {
        storageServiceMock = {
            uploadFile: jest.fn(),
        } as jest.Mocked<IStorageService>;

        documentsService = new DocumentsService();
    });

    describe('storeDocument', () => {
        it('should store the document in the specified bucket and return the URI', async () => {
            const bucket = 'my-bucket';
            const filename = 'my-file';
            const data = { document: 'content' };

            const expectedUri = 'https://example.com/my-bucket/my-file.json';

            storageServiceMock.uploadFile.mockResolvedValue(Promise.resolve({ uri: expectedUri }));

            const result = await documentsService.storeDocument(storageServiceMock, {
                bucket,
                filename,
                data,
            });

            expect(storageServiceMock.uploadFile).toHaveBeenCalledWith(
                bucket,
                `${filename}.json`,
                JSON.stringify(data),
                'application/json',
            );
            expect(result).toEqual({ uri: expectedUri });
        });

        it('should throw an error if the bucket is not provided', async () => {
            const filename = 'my-file';
            const data = { document: 'content' };

            await expect(
                documentsService.storeDocument(storageServiceMock, {
                    filename,
                    data,
                }),
            ).rejects.toThrow('Bucket is required');
        });

        it('should throw an error if the filename is not provided', async () => {
            const bucket = 'my-bucket';
            const data = { document: 'content' };

            await expect(
                documentsService.storeDocument(storageServiceMock, {
                    bucket,
                    data,
                }),
            ).rejects.toThrow('Filename is required');
        });

        it('should throw an error if the filename is not provided', async () => {
            const bucket = 'my-bucket';
            const data = { document: 'content' };

            await expect(
                documentsService.storeDocument(storageServiceMock, {
                    bucket,
                    data,
                }),
            ).rejects.toThrow('Filename is required');
        });

        it('should throw an error if the data is not a JSON object', async () => {
            const bucket = 'my-bucket';
            const filename = 'my-file.json';
            const data: any = 'invalid-data';

            await expect(
                documentsService.storeDocument(storageServiceMock, {
                    bucket,
                    filename,
                    data,
                }),
            ).rejects.toThrow('Data must be a JSON object');
        });
    });
});
