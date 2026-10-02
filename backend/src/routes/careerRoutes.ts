import { Router } from 'express';
import { createCareer, getCareers, getCareer, updateCareer, deleteCareer } from '../controllers/careerController';
import { authenticateAdmin } from '../middleware/auth';
import { validateBody, validateIdParam } from '../middleware/validate';
import { careerSchema } from '../schemas';

const router = Router();

router.post('/', authenticateAdmin, validateBody(careerSchema), createCareer);
router.get('/', getCareers);
router.get('/:id', validateIdParam, getCareer);
router.put('/:id', authenticateAdmin, validateIdParam, validateBody(careerSchema), updateCareer);
router.delete('/:id', authenticateAdmin, validateIdParam, deleteCareer);

export default router;
