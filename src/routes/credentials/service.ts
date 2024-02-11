import { isPlainObject } from 'lodash';
import { AVAILABLE_BUCKETS } from '../../config';
import { IStorageService } from '../../services';
import { ICryptographyService } from '../../services/cryptography';

interface IStoreCredentialsParams {
    bucket?: string;
    filename?: string;
    data?: Record<string, any>;
}

export class CredentialsService {
    /**
     * Encrypts and stores credentials in a storage service.
     * @param cryptographyService - The cryptography service used for encryption and key generation.
     * @param storageService - The storage service used for uploading the encrypted credentials.
     * @param bucket - The name of the bucket where the credentials will be stored.
     * @param filename - The name of the file where the credentials will be stored.
     * @param data - The JSON object containing the credentials data.
     * @returns An object containing the URI of the uploaded file, the hash of the data, and the encryption key.
     * @throws If the bucket or filename is not provided, or if the data is not a JSON object.
     */

    public async encryptAndStoreCredential(
        cryptographyService: ICryptographyService,
        storageService: IStorageService,
        { bucket, filename, data }: IStoreCredentialsParams,
    ) {
        try {
            if (!bucket || !filename) {
                throw new Error('Bucket and filename are required');
            }

            if (!AVAILABLE_BUCKETS.includes(bucket)) {
                throw new Error('Invalid bucket');
            }

            if (!isPlainObject(data)) {
                throw new Error('Data must be a JSON object');
            }

            const stringifiedData = JSON.stringify(data);

            const hash = cryptographyService.computeHash(stringifiedData);

            const key = cryptographyService.generateEncryptionKey();

            const encryptedData = cryptographyService.encryptString(stringifiedData, key);

            const objectName = filename + '.json';

            const encryptedDocument = JSON.stringify(encryptedData);

            const { uri } = await storageService.uploadFile(bucket, objectName, encryptedDocument, 'application/json');

            return {
                uri,
                hash,
                key,
            };
        } catch (err: any) {
            console.error(
                '[CredentialsService.encryptAndStoreCredential] An error occurred while encrypting and storing the credential.',
                err,
            );

            throw err;
        }
    }
}
