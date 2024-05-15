import express, { Router } from 'express';
import CategoryController from '../../controllers/CategoryController.js';
import { idNotFound } from '../../middlewares/error.middleware.js';

const router: Router = express.Router();

router.get('/', CategoryController.getAllCategory);
router.get('/:id', idNotFound, CategoryController.getCategoryById);
router.post('/', CategoryController.storeCategory);
router.put('/:id', idNotFound, CategoryController.updateCategory);
router.delete('/:id', idNotFound, CategoryController.deleteCategory);
export default router;
