import express, { Router } from 'express';
import AlbumController from '../../controllers/AlbumController.js';
const router: Router = express.Router();

router.get('/:id', AlbumController.getAlbums);
export default router;
