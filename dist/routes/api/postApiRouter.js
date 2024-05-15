import express from 'express';
import PostController from '../../controllers/PostController.js';
const router = express.Router();
router.get('/:id', PostController.getPosts);
export default router;
//# sourceMappingURL=postApiRouter.js.map