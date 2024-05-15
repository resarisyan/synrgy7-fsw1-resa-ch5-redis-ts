import express from 'express';
import CommentController from '../../controllers/CommentController.js';
const router = express.Router();
router.get('/', CommentController.getComments);
export default router;
//# sourceMappingURL=commentApiRouter.js.map