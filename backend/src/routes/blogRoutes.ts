import { Router } from 'express';
import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { authenticateAdmin } from '../middleware/auth';
import { validateBody, validateIdParam } from '../middleware/validate';
import { blogSchema } from '../schemas';

const router = Router();

router.post('/', authenticateAdmin, validateBody(blogSchema), createBlog);
router.get('/', getBlogs);
router.get('/:id', validateIdParam, getBlog);
router.put('/:id', authenticateAdmin, validateIdParam, validateBody(blogSchema), updateBlog);
router.delete('/:id', authenticateAdmin, validateIdParam, deleteBlog);

export default router;
