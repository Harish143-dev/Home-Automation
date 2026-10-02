import { Router } from 'express';
import { createCareerApplication, getCareerApplications, deleteCareerApplication } from '../controllers/careerApplicationController';
import { authenticateAdmin } from '../middleware/auth';
import { validateBody, validateIdParam } from '../middleware/validate';
import { careerApplicationSchema } from '../schemas';
import rateLimit from 'express-rate-limit';

const careerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests from this IP, please try again later.' },
});

const router = Router();

router.post('/', careerLimiter, validateBody(careerApplicationSchema), createCareerApplication);
router.get('/', authenticateAdmin, getCareerApplications);
router.delete('/:id', authenticateAdmin, validateIdParam, deleteCareerApplication);

export default router;
