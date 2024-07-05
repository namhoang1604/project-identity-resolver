import { RequestHandler } from 'express';
import { AVAILABLE_BUCKETS } from '../../config';
import { DocumentsService } from './service';
import { IStorageService } from '../../services';
import { initalizeStorageService } from '../../services/storage/service';

/**
 * Handles the request to a store document.
 *
 * @param req The request object.
 * @param res The response object.
 * @returns The response with the stored documents URI, key and hash.
 */
export const storeDocument: RequestHandler = async (req, res) => {
    try {
        const params = req.body;

        const documentsService = new DocumentsService();
        const storageService: IStorageService = initalizeStorageService();

        const response = await documentsService.storeDocument(storageService, params);

        res.status(201).json(response);
    } catch (err: any) {
        console.log('[DocumentsController.storeDocument] An error occurred while storing the document.', err);

        if (err.message === 'Invalid bucket') {
            return res.status(400).json({
                message: `Invalid bucket. Must be one of the following buckets: ${AVAILABLE_BUCKETS}`,
            });
        }

        res.status(500).json({
            message: 'An unexpected error ocurred while storing the document.',
        });
    }
};
