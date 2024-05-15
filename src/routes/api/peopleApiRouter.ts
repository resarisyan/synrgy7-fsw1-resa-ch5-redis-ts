import express, { Router } from 'express';
import PeopleController from '../../controllers/PeopleController.js';
import { idNotFound } from '../../middlewares/error.middleware.js';
import { upload } from '../../middlewares/uploadHandler.js';
import { cdnUpload } from '../../middlewares/cdnUploadHandler.js';

const router: Router = express.Router();

router.get('/', PeopleController.getAllPeople);
router.get('/:id', idNotFound, PeopleController.getPeopleById);
router.post('/', cdnUpload.single('file'), PeopleController.storePeople);
router.put(
  '/:id',
  idNotFound,
  cdnUpload.single('file'),
  PeopleController.updatePeople
);
router.delete('/:id', idNotFound, PeopleController.deletePeople);

router.post('/upload', upload.single('file'), PeopleController.uploadFile);
router.post(
  '/cdn-upload',
  cdnUpload.single('file'),
  PeopleController.cdnUploadImage
);
export default router;
