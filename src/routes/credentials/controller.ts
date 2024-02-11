import { RequestHandler } from 'express';
import { AVAILABLE_BUCKETS } from '../../config';
import { CryptographyService, GCPStorageService } from '../../services';
import { CredentialsService } from './service';

/**
 * Handles the request to a store credential.
 *
 * @param req The request object.
 * @param res The response object.
 * @returns The response with the stored credentials URI, key and hash.
 */
export const storeCredential: RequestHandler = async (req, res) => {
    try {
        const params = req.body;

        const credentialsService = new CredentialsService();
        const storageService = new GCPStorageService();
        const cryptographyService = new CryptographyService();

        const response = await credentialsService.encryptAndStoreCredential(
            cryptographyService,
            storageService,
            params,
        );

        res.status(201).json(response);
    } catch (err: any) {
        console.log('[CredentialsController.storeCredential] An error occurred while storing the credential.', err);

        if (err.message === 'Invalid bucket') {
            return res.status(400).json({
                message: `Invalid bucket. Must be one of the following buckets: ${AVAILABLE_BUCKETS}`,
            });
        }

        res.status(500).json({
            message: 'An unexpected error ocurred while storing the credential.',
        });
    }
};
