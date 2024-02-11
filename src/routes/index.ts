import { Router } from 'express';
import { credentialsRouter } from './credentials';

export const router = Router();

router.use('/credentials', credentialsRouter);
