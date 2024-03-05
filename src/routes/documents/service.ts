import { isPlainObject } from 'lodash';
import { AVAILABLE_BUCKETS } from '../../config';
import { IStorageService } from '../../services/storage';

interface IStoreDocumentsParams {
    bucket?: string;
    filename?: string;
    data?: Record<string, any>;
}

export class DocumentsService {
    /**
     * Stores documents in a storage service.
     * @param storageService - The storage service used for uploading the documents.
     * @param bucket - The name of the bucket where the documents will be stored.
     * @param filename - The name of the file where the documents will be stored.
     * @param data - The JSON object containing the documents data.
     * @returns An object containing the URI of the uploaded file
     * @throws If the bucket or filename is not provided, or if the data is not a JSON object.
     */

    public async storeDocument(storageService: IStorageService, { bucket, filename, data }: IStoreDocumentsParams) {
        try {
            if (!bucket) {
                throw new Error('Bucket is required');
            }

            if (!filename) {
                throw new Error('Filename is required');
            }

            if (!AVAILABLE_BUCKETS.includes(bucket)) {
                throw new Error('Invalid bucket');
            }

            if (!isPlainObject(data)) {
                throw new Error('Data must be a JSON object');
            }

            const stringifiedData = JSON.stringify(data);

            const objectName = filename + '.json';

            const { uri } = await storageService.uploadFile(bucket, objectName, stringifiedData, 'application/json');

            return {
                uri,
            };
        } catch (err: any) {
            console.error('[DocumentsService.storeDocument] An error occurred while storing the document.', err);

            throw err;
        }
    }
}
