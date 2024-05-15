import express from 'express';
import AlbumController from '../../controllers/AlbumController.js';
const router = express.Router();
router.get('/:id', AlbumController.getAlbums);
export default router;
//# sourceMappingURL=albumApiRouter.js.map