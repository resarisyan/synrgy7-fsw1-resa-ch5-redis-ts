import express, { Router } from 'express';
import peopleApiRouter from './api/peopleApiRouter.js';
import categoryApiRouter from './api/categoryApiRouter.js';
import productApiRouter from './api/productApiRouter.js';
import commentApiRouter from './api/commentApiRouter.js';
import peopleWebRouter from './web/peopleWebRouter.js';
import postApiRouter from './api/postApiRouter.js';
import albumApiRouter from './api/albumApiRouter.js';
import { notFound, appError } from '../middlewares/error.middleware.js';

const router: Router = express.Router();
router.use('/api/v1/peoples', peopleApiRouter);
router.use('/api/v1/categories', categoryApiRouter);
router.use('/api/v1/products', productApiRouter);
router.use('/api/v1/comments', commentApiRouter);
router.use('/api/v1/posts', postApiRouter);
router.use('/api/v1/album', albumApiRouter);
router.use('/views/peoples', peopleWebRouter);
router.use(notFound);
router.use(appError);

export default router;
