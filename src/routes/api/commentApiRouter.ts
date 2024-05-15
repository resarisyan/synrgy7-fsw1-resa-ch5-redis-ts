import express, { Router } from 'express';
import CommentController from '../../controllers/CommentController.js';
const router: Router = express.Router();

router.get('/', CommentController.getComments);
export default router;
