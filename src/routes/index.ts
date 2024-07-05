import express, { Router } from 'express';
import { credentialsRouter } from './credentials';
import { documentsRouter } from './documents';
import path from 'path';
import { LOCAL_DIRECTORY, __dirname } from '../config';

export const router = Router();

router.use('/credentials', credentialsRouter);
router.use('/documents', documentsRouter);
router.use(express.static(path.join(__dirname, LOCAL_DIRECTORY)));
