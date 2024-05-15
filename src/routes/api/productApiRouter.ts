import express, { Router } from 'express';
import ProductController from '../../controllers/ProductController.js';
import { idNotFound } from '../../middlewares/error.middleware.js';
import { cdnUpload } from '../../middlewares/cdnUploadHandler.js';

const router: Router = express.Router();

router.get('/', ProductController.getAllProduct);
router.get('/:id', idNotFound, ProductController.getProductById);
router.post('/', cdnUpload.single('file'), ProductController.storeProduct);
router.put(
  '/:id',
  idNotFound,
  cdnUpload.single('file'),
  ProductController.updateProduct
);
router.delete('/:id', idNotFound, ProductController.deleteProduct);
export default router;
