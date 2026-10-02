import { Router } from 'express';
import { createProject, getProjects, getProject, updateProject, deleteProject } from '../controllers/projectController';
import { authenticateAdmin } from '../middleware/auth';
import { validateBody, validateIdParam } from '../middleware/validate';
import { projectSchema } from '../schemas';

const router = Router();

router.post('/', authenticateAdmin, validateBody(projectSchema), createProject);
router.get('/', getProjects);
router.get('/:id', validateIdParam, getProject);
router.put('/:id', authenticateAdmin, validateIdParam, validateBody(projectSchema), updateProject);
router.delete('/:id', authenticateAdmin, validateIdParam, deleteProject);

export default router;
