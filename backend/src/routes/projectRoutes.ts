import { Router } from 'express';
import { createProject, getProjects, getProject, updateProject, deleteProject } from '../controllers/projectController';
import { authenticateAdmin } from '../middleware/auth';
import { validateIdParam } from '../middleware/validate';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/', authenticateAdmin, upload.single('image'), createProject);
router.get('/', getProjects);
router.get('/:id', validateIdParam, getProject);
router.put('/:id', authenticateAdmin, validateIdParam, upload.single('image'), updateProject);
router.delete('/:id', authenticateAdmin, validateIdParam, deleteProject);

export default router;
