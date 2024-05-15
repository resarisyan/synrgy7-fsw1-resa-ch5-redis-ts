import express from 'express';
import JobController from 'src/controllers/JobController.js';
const router = express.Router();
router.get('/', JobController.getJobs);
export default router;
//# sourceMappingURL=jobApiController.js.map