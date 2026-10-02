import { Router } from 'express';
import { loginAdmin } from '../controllers/authController';
import { validateBody } from '../middleware/validate';
import { loginSchema } from '../schemas';
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 login attempts per IP per 15 minutes to prevent brute-force attacks
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts. Please try again after 15 minutes.' },
});

const router = Router();

router.post('/login', authLimiter, validateBody(loginSchema), loginAdmin);

export default router;
