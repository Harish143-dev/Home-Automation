import { Router } from 'express';
import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { authenticateAdmin } from '../middleware/auth';
import { validateIdParam } from '../middleware/validate';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/', authenticateAdmin, upload.single('image'), createBlog);
router.get('/', getBlogs);
router.get('/:id', validateIdParam, getBlog);
router.put('/:id', authenticateAdmin, validateIdParam, upload.single('image'), updateBlog);
router.delete('/:id', authenticateAdmin, validateIdParam, deleteBlog);

export default router;
