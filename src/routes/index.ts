import { Router } from 'express';
import { credentialsRouter } from './credentials';
import { documentsRouter } from './documents';

export const router = Router();

router.use('/credentials', credentialsRouter);
router.use('/documents', documentsRouter);
