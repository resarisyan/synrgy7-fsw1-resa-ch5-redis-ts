import express, { Router } from 'express';
import PostController from '../../controllers/PostController.js';
const router: Router = express.Router();

router.get('/:id', PostController.getPosts);
export default router;
