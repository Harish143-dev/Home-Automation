import { Router } from 'express';
import { createLead, getLeads, getLead, deleteLead } from '../controllers/leadController';
import { authenticateAdmin } from '../middleware/auth';
import { validateBody, validateIdParam } from '../middleware/validate';
import { leadSchema } from '../schemas';
import rateLimit from 'express-rate-limit';

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests from this IP, please try again later.' },
});

const router = Router();

// Public route to submit a form (with rate limiting & validation)
router.post('/', leadLimiter, validateBody(leadSchema), createLead);

// Admin routes
router.get('/', authenticateAdmin, getLeads);
router.get('/:id', authenticateAdmin, validateIdParam, getLead);
router.delete('/:id', authenticateAdmin, validateIdParam, deleteLead);

export default router;
