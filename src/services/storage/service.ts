import { IStorageService } from '.';
import { STORAGE_TYPE } from '../../config';
import { GCPStorageService } from './gcp';
import { LocalStorageService } from './local';

/**
 * Initializes the storage service based on the STORAGE_TYPE environment variable.
 * @returns The storage service instance.
 */
export const initalizeStorageService = (): IStorageService => {
    switch (STORAGE_TYPE) {
        case 'gcp':
            return new GCPStorageService();
        case 'local':
            return new LocalStorageService();
        default:
            throw new Error('Invalid storage type');
    }
};
